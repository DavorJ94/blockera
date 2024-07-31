// @flow

/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Blockera dependencies
 */
import { prepare } from '@blockera/data-editor';
import { isString, isUndefined } from '@blockera/utils';
import { isInnerBlock } from '../extensions/components/utils';
import type { TStates } from '../extensions/libs/block-states/types';
import type { InnerBlockType } from '../extensions/libs/inner-blocks/types';

/**
 * Internal dependencies
 */
import { getSelector } from './utils';
import { getBaseBreakpoint } from '../canvas-editor';
import type { NormalizedSelectorProps } from './types';
import { isNormalState } from '../extensions/components';

export const getCssSelector = ({
	state,
	query,
	support,
	clientId,
	blockName,
	masterState,
	currentBlock,
	blockSelectors,
	className = '',
	suffixClass = '',
	activeDeviceType,
	fallbackSupportId,
	device = getBaseBreakpoint(),
}: NormalizedSelectorProps): string => {
	let rootSelector =
		getBaseBreakpoint() === device
			? '{{BLOCK_ID}}'
			: `.is-${device}-preview {{BLOCK_ID}}`;

	if (device === activeDeviceType && getBaseBreakpoint() !== device) {
		rootSelector = `.is-${device}-preview {{BLOCK_ID}}`;
	}

	const selectors: {
		[key: TStates]: {
			[key: 'master' | InnerBlockType | string]: string,
		},
	} = {};
	const customizedPseudoClasses = [
		'parent-class',
		'custom-class',
		'parent-hover',
	];

	const { getSelectedBlock } = select('core/block-editor') || {};
	const { clientId: _clientId } = getSelectedBlock() || {};

	const {
		getActiveInnerState,
		getActiveMasterState,
		getExtensionInnerBlockState,
		getExtensionCurrentBlockState,
	} = select('blockera/extensions');

	const getInnerState = () =>
		_clientId === clientId
			? getActiveInnerState(clientId, currentBlock)
			: getExtensionInnerBlockState();
	const getMasterState = () =>
		_clientId === clientId
			? getActiveMasterState(clientId, blockName)
			: getExtensionCurrentBlockState();

	// primitive block value.
	let block: Object = {};

	if ('function' === typeof getSelectedBlock) {
		block = getSelectedBlock();
	}

	const register = (_selector: string): void => {
		const registerSelector = (generatedSelector: string) => {
			switch (state) {
				case 'parent-class':
					if (block?.attributes?.blockeraBlockStates[state]) {
						generatedSelector = `${block?.attributes?.blockeraBlockStates[state]['css-class']} ${generatedSelector}`;
					}
					break;
				case 'custom-class':
					if (block?.attributes?.blockeraBlockStates[state]) {
						generatedSelector =
							block?.attributes?.blockeraBlockStates[state][
								'css-class'
							] +
							suffixClass +
							',' +
							generatedSelector;
					}
					break;

				case 'parent-hover':
					// FIXME: implements parent-hover pseudo-class for parent selector.
					break;
			}

			selectors[state] = {
				// $FlowFixMe
				[currentBlock]: generatedSelector,
			};
		};

		const normalizedSelector = (
			fromInnerBlock: boolean = false
		): string => {
			const parsedSelectors = _selector.split(',');
			const generateSelector = (selector: string): string => {
				// Current Block is inner block.
				if (fromInnerBlock) {
					// Assume inner block inside pseudo-state of master.
					if (masterState && !isNormalState(masterState)) {
						if (!isNormalState(state)) {
							if (
								!isNormalState(getMasterState()) &&
								masterState === getMasterState() &&
								!isNormalState(getInnerState()) &&
								state === getInnerState()
							) {
								return `${rootSelector}:${masterState} ${selector}${suffixClass}:${state}, ${rootSelector} ${selector}${suffixClass}`;
							}

							return `${rootSelector}:${masterState} ${selector}${suffixClass}:${state}`;
						}

						return `${rootSelector}:${masterState} ${selector}${suffixClass}`;
					}

					if (!isNormalState(state) && masterState) {
						if (
							!isNormalState(getInnerState()) &&
							state === getInnerState()
						) {
							return `${rootSelector} ${selector}${suffixClass}:${state}, ${rootSelector} ${selector}${suffixClass}`;
						}

						return `${rootSelector} ${selector}${suffixClass}:${state}`;
					}

					return `${rootSelector} ${selector}${suffixClass}`;
				}

				// Recieved state is not normal.
				if (!isNormalState(state)) {
					// Assume active master block state is not normal.
					if (
						!isNormalState(getMasterState()) &&
						state === getMasterState()
					) {
						return `${selector}${suffixClass}:${state}, ${selector}${suffixClass}`;
					}

					return `${selector}${suffixClass}:${state}`;
				}

				return `${selector}${suffixClass}`;
			};

			if (1 === parsedSelectors.length) {
				if (customizedPseudoClasses.includes(state)) {
					return _selector;
				}

				return generateSelector(_selector);
			}

			return parsedSelectors
				.map((selector: string): string => {
					if (customizedPseudoClasses.includes(state)) {
						return selector;
					}

					return generateSelector(selector);
				})
				.join(', ');
		};

		// Assume selector is invalid.
		if (!_selector) {
			// we try to use parent or custom css class if exists!
			if (
				['parent-class', 'custom-class'].includes(state) &&
				block?.attributes?.blockeraBlockStates[state]
			) {
				_selector =
					block?.attributes?.blockeraBlockStates[state]['css-class'];

				if (_selector.trim()) {
					if ('parent-class' === state) {
						_selector = `${_selector} ${rootSelector}${suffixClass}`;
					}

					selectors[state] = {
						// $FlowFixMe
						[currentBlock]: _selector,
					};

					return;
				}
			}

			selectors[state] = {
				// $FlowFixMe
				[currentBlock]: rootSelector + suffixClass,
			};

			return;
		}

		// Assume current block is one of inners type.
		if (isInnerBlock(currentBlock)) {
			switch (state) {
				case 'custom-class':
				case 'parent-class':
					// TODO:
					break;
				case 'parent-hover':
					// TODO:
					break;
				default:
					registerSelector(normalizedSelector(true));
					break;
			}
		}
		// Current block is master.
		else {
			switch (state) {
				case 'custom-class':
				case 'parent-class':
					// TODO:
					break;
				case 'parent-hover':
					// TODO:
					break;
				default:
					registerSelector(normalizedSelector());
					break;
			}
		}
	};

	// preparing css selector from support path as key in block selectors map as object.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const selector = prepareCssSelector({
		query,
		support,
		fallbackSupportId,
		selectors: blockSelectors,
	});

	// FIXME: after implements parent-hover infrastructure please remove exclude this pseudo-class!
	if (['parent-hover'].includes(state)) {
		// TODO: implements ...
		return '';
	}

	if (selector && selector.trim()) {
		register(selector);
	} else {
		register(rootSelector);
	}

	return getSelector({
		state,
		clientId,
		selectors,
		className,
		currentBlock,
	});
};

/**
 * Retrieve css selector with selectors dataset , support id and query string.
 *
 * @param {{support:string,selectors:Object,query:string,fallbackSupportId:string}} props
 *
 * @return {string} the css selector for support
 */
export function prepareCssSelector(props: {
	support?: string,
	selectors: Object,
	query?: string,
	fallbackSupportId?: string,
}): string | void {
	const { support, selectors, query, fallbackSupportId } = props;

	//Preparing selector with query of support.
	const selector = prepare(query, selectors);

	//Fallback for sub feature of support to return selector
	if (!selector) {
		if (isUndefined(support) || isUndefined(selectors[support])) {
			return !isUndefined(fallbackSupportId)
				? prepareCssSelector({
						...props,
						support: fallbackSupportId,
						fallbackSupportId: undefined,
				  })
				: selectors.root;
		}

		return isString(selectors[support])
			? selectors[support]
			: selectors[support].root || selectors.root;
	}

	//Selector for sub feature of support
	return selector;
}

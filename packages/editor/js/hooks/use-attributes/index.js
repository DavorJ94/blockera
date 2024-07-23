// @flow

/**
 * External dependencies
 */
import { select } from '@wordpress/data';

/**
 * Blockera dependencies
 */
import { classNames } from '@blockera/classnames';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import { isChanged } from './helpers';
import { isInnerBlock } from '../../extensions/components/utils';
import actions, { type UseAttributesActions } from './actions';
import type { THandleOnChangeAttributes } from '../../extensions/libs/types';

export const useAttributes = (
	setAttributes: (attributes: Object) => void,
	{
		blockId,
		className,
		innerBlocks,
		isNormalState,
		getAttributes,
		blockVariations,
		defaultAttributes,
		masterIsNormalState,
		blockeraInnerBlocks,
		activeBlockVariation,
		getActiveBlockVariation,
	}: {
		blockId: string,
		className: string,
		innerBlocks: Object,
		blockVariations: Object,
		defaultAttributes: Object,
		blockeraInnerBlocks: Object,
		isNormalState: () => boolean,
		activeBlockVariation: Object,
		masterIsNormalState: () => boolean,
		getAttributes: (key?: string) => any,
		getActiveBlockVariation: (name: string, attributes: Object) => boolean,
	}
): ({
	getAttributesWithIds: (state: Object, identifier: string) => Object,
	handleOnChangeAttributes: THandleOnChangeAttributes,
}) => {
	const getAttributesWithIds = (
		state: Object,
		identifier: string
	): Object => {
		const d = new Date();

		if (state[identifier]) {
			return state;
		}

		return {
			...state,
			[identifier]:
				'' +
				d.getMonth() +
				d.getDate() +
				d.getHours() +
				d.getMinutes() +
				d.getSeconds() +
				d.getMilliseconds(),
		};
	};
	const handleOnChangeAttributes: THandleOnChangeAttributes = (
		attributeId,
		newValue,
		options = {}
	): void => {
		const { ref, effectiveItems = {} } = options;
		const { getSelectedBlock } = select('core/block-editor');
		const { attributes = getAttributes(), clientId } =
			getSelectedBlock() || {};
		const {
			getExtensionCurrentBlock,
			getExtensionInnerBlockState,
			getExtensionCurrentBlockState,
			getExtensionCurrentBlockStateBreakpoint,
		} = select('blockera/extensions');

		// attributes => immutable - mean just read-only!
		// _attributes => mutable - mean readable and writable constant!
		let _attributes = { ...attributes };

		// Sets "blockeraPropsId" if it is empty.
		if (!_attributes?.blockeraPropsId) {
			_attributes = getAttributesWithIds(_attributes, 'blockeraPropsId');
		}

		// Sets "className" attribute value is existing on block attributes to merge with default value.
		if (!attributes?.className) {
			_attributes = {
				..._attributes,
				className: classNames(className, {
					'blockera-block': true,
					[`blockera-block-${clientId}`]: true,
				}),
			};
		}

		const currentBlock = getExtensionCurrentBlock();

		const attributeIsBlockStates = 'blockeraBlockStates' === attributeId;
		const hasRootAttributes =
			_attributes.blockeraInnerBlocks &&
			_attributes.blockeraInnerBlocks[currentBlock];

		// check - is really changed attribute of any block type (master or one of inner blocks)?
		if (isNormalState()) {
			// Assume block is inner block and has attributes in normal state.
			if (
				isInnerBlock(currentBlock) &&
				hasRootAttributes &&
				!isChanged(
					{
						..._attributes,
						..._attributes.blockeraInnerBlocks[currentBlock]
							.attributes,
					},
					attributeId,
					newValue
				)
			) {
				return;
			}

			// Assume block is master.
			if (
				!isInnerBlock(currentBlock) &&
				!isChanged(attributes, attributeId, newValue)
			) {
				return;
			}
		}

		const currentState = getExtensionCurrentBlockState();
		const currentInnerBlockState = getExtensionInnerBlockState();
		const currentBreakpoint = getExtensionCurrentBlockStateBreakpoint();

		const {
			reset,
			updateNormalState,
			updateBlockStates,
			updateInnerBlockStates,
			updateInnerBlockInsideParentState,
		}: UseAttributesActions = actions({
			blockId,
			newValue,
			attributeId,
			innerBlocks,
			currentState,
			currentBlock,
			effectiveItems,
			getAttributes,
			isNormalState,
			blockVariations,
			currentBreakpoint,
			defaultAttributes,
			blockeraInnerBlocks,
			activeBlockVariation,
			currentInnerBlockState,
			attributeIsBlockStates,
			getActiveBlockVariation,
			ref: { ...ref?.current },
		});

		// Assume reference current action is 'reset_all_states'
		if (ref?.current?.reset) {
			return setAttributes(
				reducer(
					_attributes,
					reset('reset_all_states' === ref.current.action)
				)
			);
		}

		// Current block (maybe 'master' or any inner blocks) in normal state!
		// or
		// attribute is "blockeraBlockStates"
		// action = UPDATE_NORMAL_STATE
		if (masterIsNormalState() && isNormalState()) {
			return setAttributes(reducer(_attributes, updateNormalState()));
		}

		// Assume current block is one of inner blocks.
		if (isInnerBlock(currentBlock)) {
			// Assume master block isn't in normal state!
			// action = UPDATE_INNER_BLOCK_INSIDE_PARENT_STATE
			if (!masterIsNormalState()) {
				return setAttributes(
					reducer(attributes, updateInnerBlockInsideParentState())
				);
			}
			// Assume current block isn't in normal state and attributeId isn't "blockeraBlockStates" for prevent cyclic object error!
			// action = UPDATE_INNER_BLOCK_STATES
			if (!isNormalState() && !attributeIsBlockStates) {
				return setAttributes(
					reducer(_attributes, updateInnerBlockStates())
				);
			}
		}

		// Assume block state is normal and attributeId is equals with "blockeraBlockStates".
		// action = UPDATE_NORMAL_STATE
		if (attributeIsBlockStates || isNormalState()) {
			return setAttributes(reducer(_attributes, updateNormalState()));
		}

		// handle update attributes in activated state and breakpoint for master block.
		// action = UPDATE_BLOCK_STATES
		setAttributes(reducer(_attributes, updateBlockStates()));
	};

	return {
		getAttributesWithIds,
		handleOnChangeAttributes,
	};
};

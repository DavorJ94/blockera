// @flow
/**
 * External dependencies
 */
import type { MixedElement } from 'react';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Blockera dependencies
 */
import { Tooltip } from '@blockera/controls';
import { controlInnerClassNames } from '@blockera/classnames';
import { Icon } from '@blockera/icons';

/**
 * Internal dependencies
 */
import { isInnerBlock } from '../../extensions';
import { useExtensionsStore } from '../../hooks/use-extensions-store';
import type { TStates } from '../../extensions/libs/block-states/types';

export default function EditedItem({
	state,
	label,
	breakpoint,
	current = false,
	onClick = () => {},
	...props
}: {
	state: TStates,
	label: string,
	breakpoint: string,
	current: boolean,
	onClick: () => void,
}): MixedElement {
	const { currentState, currentInnerBlockState, currentBlock } =
		useExtensionsStore();

	return (
		<Tooltip
			text={sprintf(
				/* translators: %1$s: Breakpoint name, %2$s: Block state name */
				__('Switch To: %1$s → %2$s', 'blockera'),
				breakpoint,
				label
			)}
		>
			<div
				className={controlInnerClassNames(
					'states-changes-item',
					'state-' + state,
					{
						[`is-active-${state}-parent-state`]:
							currentState === state &&
							!isInnerBlock(currentBlock),
						[`is-active-${state}-inner-state`]:
							currentInnerBlockState === state &&
							isInnerBlock(currentBlock),
					}
				)}
				onClick={onClick}
				{...props}
			>
				{label}

				{current && (
					<span
						className={controlInnerClassNames(
							'states-changes-item-current'
						)}
					>
						{__('Current', 'blockera')}
					</span>
				)}

				<Icon
					icon="pen"
					iconSize="18"
					className={controlInnerClassNames(
						'states-changes-item__edit-icon'
					)}
				/>
			</div>
		</Tooltip>
	);
}

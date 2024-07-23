// @flow

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MixedElement } from 'react';

/**
 * Blockera dependencies
 */
import {
	SharedBlockExtension,
	sharedBlockExtensionSupports,
	sharedBlockExtensionAttributes,
} from '@blockera/editor';
import type { InnerBlocks } from '@blockera/editor/js/extensions/libs/inner-blocks/types';
import { Icon } from '@blockera/icons';

const blockeraInnerBlocks: InnerBlocks = {
	'elements/term-item': {
		name: 'elements/term-item',
		label: __('Link', 'blockera'),
		icon: <Icon icon="block-link" iconSize="20" />,
		settings: {
			force: true,
		},
	},
	'core/list-item': {
		name: 'core/list-item',
		label: __('Link Parent', 'blockera'),
		icon: <Icon icon="block-list-item" iconSize="20" />,
		settings: {
			force: true,
		},
	},
};

export const Categories = {
	name: 'blockeraCategories',
	targetBlock: 'core/categories',
	blockeraInnerBlocks,
	edit: (props: Object): MixedElement => {
		return <SharedBlockExtension {...props} />;
	},
};

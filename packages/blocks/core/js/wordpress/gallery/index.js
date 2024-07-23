// @flow

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MixedElement } from 'react';

/**
 * Blockera dependencies
 */
import { SharedBlockExtension } from '@blockera/editor';
import type { InnerBlocks } from '@blockera/editor/js/extensions/libs/inner-blocks/types';
import { Icon } from '@blockera/icons';

const blockeraInnerBlocks: InnerBlocks = {
	gallery_caption: {
		name: 'core/gallery_caption',
		type: 'image',
		label: __('Gallery Caption', 'blockera'),
		icon: <Icon icon="block-gallery-caption" iconSize="20" />,
		selectors: {
			root: '> figcaption',
		},
		innerBlockSettings: {
			force: true,
		},
	},
	image: {
		name: 'core/image',
		type: 'image',
		label: __('Images', 'blockera'),
		icon: <Icon icon="block-image" iconSize="20" />,
		selectors: {
			root: '.wp-block-image img',
		},
		innerBlockSettings: {
			force: true,
		},
	},
	image_caption: {
		name: 'core/image_caption',
		type: 'image',
		label: __('Images Captions', 'blockera'),
		icon: <Icon icon="block-image-caption" iconSize="20" />,
		selectors: {
			root: '.wp-block-image figcaption',
		},
		innerBlockSettings: {
			force: true,
		},
	},
};

export const Gallery = {
	name: 'blockeraGallery',
	targetBlock: 'core/gallery',
	blockeraInnerBlocks,
	edit: (props: Object): MixedElement => {
		return <SharedBlockExtension {...props} />;
	},
};

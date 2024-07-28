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

/**
 * Internal dependencies
 */
import image from '../inners/image';

const blockeraInnerBlocks: InnerBlocks = {
	'elements/gallery-caption': {
		name: 'elements/gallery-caption',
		label: __('Gallery Caption', 'blockera'),
		icon: <Icon icon="block-gallery-caption" iconSize="20" />,
		settings: {
			force: true,
		},
	},
	'elements/image-caption': {
		name: 'elements/image-caption',
		label: __('Images Captions', 'blockera'),
		icon: <Icon icon="block-image-caption" iconSize="20" />,
		settings: {
			force: true,
		},
	},
};

export const Gallery = {
	name: 'blockeraGallery',
	targetBlock: 'core/gallery',
	blockeraInnerBlocks: {
		...blockeraInnerBlocks,
		...image,
	},
	edit: (props: Object): MixedElement => {
		return <SharedBlockExtension {...props} />;
	},
};

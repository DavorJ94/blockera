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
	paragraph: {
		name: 'core/paragraph',
		type: 'paragraph',
		label: __('Paragraphs', 'blockera'),
		icon: <Icon icon="block-paragraph" iconSize="20" />,
		selectors: {
			root: 'p',
		},
		innerBlockSettings: {
			force: true,
		},
	},
	image: {
		name: 'core/image',
		type: 'image',
		label: __('Image', 'blockera'),
		icon: <Icon icon="block-image" iconSize="20" />,
		selectors: {
			root: '.wp-block-media-text__media > img',
		},
		innerBlockSettings: {
			force: true,
		},
	},
	link: {
		name: 'core/link',
		type: 'link',
		label: __('Links', 'blockera'),
		icon: <Icon icon="block-link" iconSize="20" />,
		selectors: {
			root: 'a:not(.wp-element-button)',
		},
		innerBlockSettings: {
			force: true,
			dataCompatibility: ['font-color', 'font-color-hover'],
		},
	},
	heading: {
		name: 'core/heading',
		type: 'heading',
		label: __('Headings', 'blockera'),
		icon: <Icon icon="block-headings" iconSize="20" />,
		selectors: {
			root: 'h1.wp-block-heading, h2.wp-block-heading, h3.wp-block-heading, h4.wp-block-heading, h5.wp-block-heading, h6.wp-block-heading',
		},
		innerBlockSettings: {
			force: true,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading1: {
		name: 'core/h1',
		type: 'h1',
		label: __('H1s', 'blockera'),
		icon: <Icon icon="block-heading-1" iconSize="20" />,
		selectors: {
			root: 'h1.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading2: {
		name: 'core/h2',
		type: 'h2',
		label: __('H2s', 'blockera'),
		icon: <Icon icon="block-heading-2" iconSize="20" />,
		selectors: {
			root: 'h2.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading3: {
		name: 'core/h3',
		type: 'h3',
		label: __('H3s', 'blockera'),
		icon: <Icon icon="block-heading-3" iconSize="20" />,
		selectors: {
			root: 'h3.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading4: {
		name: 'core/h4',
		type: 'h4',
		label: __('H4s', 'blockera'),
		icon: <Icon icon="block-heading-4" iconSize="20" />,
		selectors: {
			root: 'h4.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading5: {
		name: 'core/h5',
		type: 'h5',
		label: __('H5s', 'blockera'),
		icon: <Icon icon="block-heading-5" iconSize="20" />,
		selectors: {
			root: 'h5.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	heading6: {
		name: 'core/h6',
		type: 'h6',
		label: __('H6s', 'blockera'),
		icon: <Icon icon="block-heading-6" iconSize="20" />,
		selectors: {
			root: 'h6.wp-block-heading',
		},
		innerBlockSettings: {
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
};

export const MediaText = {
	name: 'blockeraMediaText',
	targetBlock: 'core/media-text',
	blockeraInnerBlocks,
	edit: (props: Object): MixedElement => {
		return <SharedBlockExtension {...props} />;
	},
};

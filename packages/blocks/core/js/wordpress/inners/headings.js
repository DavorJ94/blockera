// @flow

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MixedElement } from 'react';

/**
 * Blockera dependencies
 */
import type { InnerBlocks } from '@blockera/editor/js/extensions/libs/inner-blocks/types';
import { Icon } from '@blockera/icons';

const headings: InnerBlocks = {
	'core/heading': {
		name: 'core/heading',
		label: __('Headings', 'blockera'),
		icon: <Icon icon="block-headings" iconSize="20" />,
		settings: {
			// because "core/heading" block default value for "level" attribute is "2".
			level: 2,
			force: true,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-1': {
		name: 'core/heading',
		label: __('H1s', 'blockera'),
		icon: <Icon icon="block-heading-1" iconSize="20" />,
		settings: {
			level: 1,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-2': {
		name: 'core/heading',
		label: __('H2s', 'blockera'),
		icon: <Icon icon="block-heading-2" iconSize="20" />,
		settings: {
			level: 2,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-3': {
		name: 'core/heading',
		label: __('H3s', 'blockera'),
		icon: <Icon icon="block-heading-3" iconSize="20" />,
		settings: {
			level: 3,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-4': {
		name: 'core/heading',
		label: __('H4s', 'blockera'),
		icon: <Icon icon="block-heading-4" iconSize="20" />,
		settings: {
			level: 4,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-5': {
		name: 'core/heading',
		label: __('H5s', 'blockera'),
		icon: <Icon icon="block-heading-5" iconSize="20" />,
		settings: {
			level: 5,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
	'core/heading-6': {
		name: 'core/heading',
		label: __('H6s', 'blockera'),
		icon: <Icon icon="block-heading-6" iconSize="20" />,
		settings: {
			level: 6,
			force: false,
			dataCompatibility: [
				'font-color',
				'background-color',
				'background-image',
			],
		},
	},
};

export default headings;

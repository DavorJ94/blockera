/**
 * Blockera dependencies
 */
import { getValueAddonRealValue } from '@blockera/controls';

/**
 * Internal dependencies
 */
import { createCssDeclarations } from '../../../../style-engine';

export function OutlineGenerator(id, props, options) {
	const { attributes } = props;

	if (!Object.values(attributes?.blockeraOutline)?.length) {
		return '';
	}

	const properties = {
		outlines: [],
		offset: [],
	};

	Object.entries(attributes?.blockeraOutline)?.map(([, item]) => {
		if (!item.isVisible) {
			return null;
		}

		properties.outlines.push(
			`${item.border.width} ${item.border.style} ${getValueAddonRealValue(
				item.border.color
			)}`
		);
		properties.offset.push(getValueAddonRealValue(item.offset));

		return undefined;
	});

	return createCssDeclarations({
		options,
		properties: {
			outline: properties.outlines?.join(', '),
			'outline-offset': properties.offset?.join(', '),
		},
	});
}

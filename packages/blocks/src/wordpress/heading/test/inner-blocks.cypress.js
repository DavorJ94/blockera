/**
 * Cypress dependencies
 */
import {
	appendBlocks,
	openInnerBlocksExtension,
	openMoreFeaturesControl,
} from '../../../../../../cypress/helpers';

describe('Heading Block → Inner Blocks', () => {
	it('Should add all inner blocks to block settings', () => {
		appendBlocks(
			'<!-- wp:heading -->\n' +
				'<h2 class="wp-block-heading">Heading text</h2>\n' +
				'<!-- /wp:heading -->'
		);

		// Select target block
		cy.getBlock('core/heading').click();

		// open inner block settings
		openInnerBlocksExtension();

		cy.get('.publisher-extension.publisher-extension-inner-blocks').within(
			() => {
				cy.getByAriaLabel('Links Customize').should('exist');

				// no other item
				cy.getByAriaLabel('Buttons Customize').should('not.exist');
			}
		);
	});
});

/**
 * Cypress dependencies
 */
import {
	appendBlocks,
	openInnerBlocksExtension,
	openMoreFeaturesControl,
} from '../../../../../../cypress/helpers';

describe('Pullquote Block → Inner Blocks', () => {
	it('Should add all inner blocks to block settings', () => {
		appendBlocks(
			'<!-- wp:pullquote -->\n' +
				'<figure class="wp-block-pullquote"><blockquote><p>Quote or not quote?</p><cite>The Hero</cite></blockquote></figure>\n' +
				'<!-- /wp:pullquote -->\n '
		);

		// Select target block
		cy.getBlock('core/pullquote').click();

		// open inner block settings
		openInnerBlocksExtension();

		cy.get('.publisher-extension.publisher-extension-inner-blocks').within(
			() => {
				cy.getByAriaLabel('Citation Customize').should('exist');
				cy.getByAriaLabel('Links Customize').should('exist');
				cy.getByAriaLabel('Paragraphs Customize').should('exist');

				cy.getByAriaLabel('Headings Customize').should('not.exist');
			}
		);
	});
});

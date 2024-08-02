/**
 * Blockera dependencies
 */
import {
	createPost,
	appendBlocks,
	openInnerBlocksExtension,
} from '@blockera/dev-cypress/js/helpers';

describe('Cover Block → Inner Blocks', () => {
	beforeEach(() => {
		createPost();
	});

	it('Should add all inner blocks to block settings', () => {
		appendBlocks(
			'<!-- wp:cover {"url":"https://placehold.co/600x400","id":60,"dimRatio":50,"customOverlayColor":"#4658a9","layout":{"type":"constrained"}} -->\n' +
				'<div class="wp-block-cover"><span aria-hidden="true" class="wp-block-cover__background has-background-dim" style="background-color:#4658a9"></span><img class="wp-block-cover__image-background wp-image-60" alt="" src="https://placehold.co/600x400" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"center","placeholder":"Write title…","fontSize":"large"} -->\n' +
				'<p class="has-text-align-center has-large-font-size">Paragraph text here...</p>\n' +
				'<!-- /wp:paragraph --></div></div>\n' +
				'<!-- /wp:cover -->'
		);

		// Select target block
		cy.getBlock('core/paragraph').first().click();

		// Switch to parent block
		cy.getByAriaLabel('Select Cover').click();

		// open inner block settings
		openInnerBlocksExtension();

		cy.get('.blockera-extension.blockera-extension-inner-blocks').within(
			() => {
				cy.getByDataTest('core/heading').should('exist');
				cy.getByDataTest('core/paragraph').should('exist');
				cy.getByDataTest('core/button').should('exist');

				// no other item
				cy.getByDataTest('elements/link').should('not.exist');
			}
		);
	});
});

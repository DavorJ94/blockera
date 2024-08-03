/**
 * Blockera dependencies
 */
import { createPost, appendBlocks } from '@blockera/dev-cypress/js/helpers';

describe('Page List Block → Inner Blocks', () => {
	beforeEach(() => {
		createPost();
	});

	it('Should not have inner blocks', () => {
		appendBlocks(`<!-- wp:page-list /-->`);

		cy.getBlock('core/page-list').click();

		cy.get('.blockera-extension.blockera-extension-inner-blocks').should(
			'not.exist'
		);
	});
});

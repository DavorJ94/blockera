/**
 * Cypress dependencies
 */
import {
	appendBlocks,
	createPost,
	openInnerBlocksExtension,
	openMoreFeaturesControl,
} from '../../../../../../cypress/helpers';

describe('Site Tagline Block → Inner Blocks', () => {
	beforeEach(() => {
		createPost();
	});

	it('Should not have inner blocks', () => {
		appendBlocks(`<!-- wp:site-tagline /-->`);

		cy.getBlock('core/site-tagline').click();

		cy.get('.blockera-extension.blockera-extension-inner-blocks').should(
			'not.exist'
		);
	});
});

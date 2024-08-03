/**
 * Blockera dependencies
 */
import { createPost, appendBlocks } from '@blockera/dev-cypress/js/helpers';

describe('Separator Block → Inner Blocks', () => {
	beforeEach(() => {
		createPost();
	});

	it('Should not have inner blocks', () => {
		appendBlocks(`<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->`);

		cy.getBlock('core/separator').click();

		cy.get('.blockera-extension.blockera-extension-inner-blocks').should(
			'not.exist'
		);
	});
});

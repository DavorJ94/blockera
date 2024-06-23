import {
	savePage,
	addBlockToPost,
	getWPDataObject,
	getSelectedBlock,
	redirectToFrontPage,
	openMoreFeaturesControl,
	createPost,
} from '@blockera/dev-cypress/js/helpers';

describe('Text Transform → Functionality', () => {
	beforeEach(() => {
		createPost();

		addBlockToPost('core/paragraph', true, 'blockera-paragraph');

		cy.getBlock('core/paragraph').type('This is test text.', {
			delay: 0,
		});

		cy.getByDataTest('style-tab').click();
	});

	it('Simple value', () => {
		openMoreFeaturesControl('More typography settings');

		cy.getByAriaLabel('Uppercase').click();

		//Check block
		cy.getBlock('core/paragraph').should(
			'have.css',
			'text-transform',
			'uppercase'
		);

		//Check store
		getWPDataObject().then((data) => {
			expect('uppercase').to.be.equal(
				getSelectedBlock(data, 'blockeraTextTransform')
			);
		});

		//Check frontend
		savePage();

		redirectToFrontPage();

		cy.get('.blockera-block').should(
			'have.css',
			'text-transform',
			'uppercase'
		);
	});
});

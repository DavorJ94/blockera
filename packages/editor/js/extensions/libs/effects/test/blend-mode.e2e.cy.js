import {
	savePage,
	getWPDataObject,
	getSelectedBlock,
	redirectToFrontPage,
	createPost,
} from '@blockera/dev-cypress/js/helpers';

describe('Blend Mode → Functionality', () => {
	beforeEach(() => {
		createPost();

		cy.getBlock('default').type('This is test paragraph', { delay: 0 });
		cy.getByDataTest('style-tab').click();

		cy.activateMoreSettingsItem('More Effect Settings', 'Blending Mode');

		cy.getParentContainer('Blending').as('container');
	});

	it('should update blend-mode correctly, when add multiply', () => {
		cy.get('@container').within(() => {
			cy.customSelect('Multiply');
		});

		// Check block
		cy.getBlock('core/paragraph').should(
			'have.css',
			'mix-blend-mode',
			'multiply'
		);

		// Check store
		getWPDataObject().then((data) => {
			expect('multiply').to.be.equal(
				getSelectedBlock(data, 'blockeraBlendMode')
			);
		});

		// Check frontend
		savePage();

		redirectToFrontPage();

		cy.get('.blockera-block').should(
			'have.css',
			'mix-blend-mode',
			'multiply'
		);
	});
});

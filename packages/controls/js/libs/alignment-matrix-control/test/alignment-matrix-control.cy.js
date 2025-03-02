/// <reference types="Cypress" />

import AlignmentMatrixControl from '..';
import { getControlValue } from '../../../store/selectors';

describe('alignment-matrix control', () => {
	beforeEach(() => {
		cy.viewport(1280, 720);
	});

	context('Rendering', () => {
		it('should render 2 input with top and left label and a matrix to select points when inputFields=true', () => {
			cy.withDataProvider({
				component: <AlignmentMatrixControl inputFields={true} />,
			});

			cy.get('input[type="text"]').should('have.length', 2);
			cy.get('[aria-label="Top"]');
			cy.get('[aria-label="Left"]');
			cy.get('[aria-label="Alignment Matrix Control"]');
		});

		it('should only render matrix by default', () => {
			cy.withDataProvider({
				component: <AlignmentMatrixControl />,
			});

			cy.get('[aria-label="Alignment Matrix Control"]');
			cy.get('input[type="text"]').should('have.length', 0);
			cy.get('[aria-label="top"]').should('not.exist');
			cy.get('[aria-label="left"]').should('not.exist');
		});
	});
	context('Functional', () => {
		const specialPoints = [0, 50, 100];
		it('should select correct point on matrix when entering corresponding values in inputs && should de-select active point by adding 1 to current value of inputs', () => {
			const name = 'alignment-matrix-1';
			cy.withDataProvider({
				component: <AlignmentMatrixControl inputFields={true} />,
				value: undefined,
				name,
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			specialPoints.forEach((top, rowIdx) => {
				// select all then type instead of clear to prevent input catch value from default
				cy.get('@inputTop').type(`{selectall}${top}`);

				specialPoints.forEach((left, colIdx) => {
					// 1. should select correct point on matrix when entering corresponding values in inputs
					cy.get('@inputLeft').type(`{selectall}${left}`);

					// visual & data assertion
					cy.getByDataTest('matrix-item')
						.eq(
							// eslint-disable-next-line no-nested-ternary
							rowIdx === 0
								? colIdx
								: rowIdx === 1
								? rowIdx * 2 + 1 + colIdx
								: rowIdx * 2 + 2 + colIdx
						)
						.should('have.class', 'selected')
						.then(() => {
							expect(getControlValue(name)).to.be.deep.equal({
								top: `${top}%`,
								left: `${left}%`,
							});
						});

					// 2. should de-select active point by adding 1 to current value of inputs

					if (left === 100) {
						cy.get('@inputLeft').type(`{selectall}${left - 1}`);
					} else {
						cy.get('@inputLeft').type(
							`{selectall}${left === 0 ? left + 1 : left - 1}`
						);
					}

					// visual assertion is enough
					cy.getByDataTest('matrix-item')
						.eq(
							// eslint-disable-next-line no-nested-ternary
							rowIdx === 0
								? colIdx
								: rowIdx === 1
								? rowIdx * 2 + 1 + colIdx
								: rowIdx * 2 + 2 + colIdx
						)
						.should('not.have.class', 'selected');
				});
			});
		});

		it('should select points by clicking on them', () => {
			const name = 'alignment-matrix-2';
			cy.withDataProvider({
				component: <AlignmentMatrixControl inputFields={true} />,
				value: undefined,
				name,
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			specialPoints.forEach((row, rowIdx) => {
				specialPoints.forEach((col, colIdx) => {
					cy.getByDataTest('matrix-item')
						.eq(
							// eslint-disable-next-line no-nested-ternary
							rowIdx === 0
								? colIdx
								: rowIdx === 1
								? rowIdx * 2 + 1 + colIdx
								: rowIdx * 2 + 2 + colIdx
						)
						.click();

					// visual assertion
					cy.get('@inputTop').should('have.value', row);
					cy.get('@inputLeft').should('have.value', col);

					// data assertion
					cy.get('@inputLeft').then(() => {
						expect(getControlValue(name)).to.be.deep.equal({
							top: `${row}%`,
							left: `${col}%`,
						});
					});
				});
			});
		});
	});
	context('Initial Value Tests', () => {
		const defaultValue = { top: '20%', left: '10%' };
		// 1.
		it('calculated data must be defaultValue, when defaultValue(ok) && id(!ok) value(undefined)', () => {
			cy.withDataProvider({
				component: (
					<AlignmentMatrixControl
						defaultValue={defaultValue}
						inputFields={true}
					/>
				),
				value: undefined,
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			cy.get('@inputTop').should('have.value', 20);
			cy.get('@inputLeft').should('have.value', 10);
		});

		// 2.
		it('calculated data must be defaultValue, when defaultValue(ok) && id(!ok) && value(ok)', () => {
			cy.withDataProvider({
				component: (
					<AlignmentMatrixControl
						defaultValue={defaultValue}
						inputFields={true}
						id="x.y"
					/>
				),
				value: { top: '50%', left: '50%' },
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			cy.get('@inputTop').should('have.value', 20);
			cy.get('@inputLeft').should('have.value', 10);
		});

		// 3.
		it('calculated data must be defaultValue, when defaultValue(ok) && id(ok) && value(undefined)', () => {
			cy.withDataProvider({
				component: (
					<AlignmentMatrixControl
						id="x[0].b[0].c"
						defaultValue={defaultValue}
						inputFields={true}
					/>
				),
				value: {
					x: [
						{
							b: [
								{
									c: undefined,
								},
							],
						},
					],
				},
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			cy.get('@inputTop').should('have.value', 20);
			cy.get('@inputLeft').should('have.value', 10);
		});

		// 4.
		it('calculated data must be value, when id(!ok), defaultValue(!ok), value(root)', () => {
			cy.withDataProvider({
				component: <AlignmentMatrixControl inputFields={true} />,
				value: { top: '50%', left: '50%' },
			});

			cy.get('input[type="text"]').eq(0).as('inputTop');
			cy.get('input[type="text"]').eq(1).as('inputLeft');

			cy.get('@inputTop').should('have.value', 50);
			cy.get('@inputLeft').should('have.value', 50);
		});
	});
});

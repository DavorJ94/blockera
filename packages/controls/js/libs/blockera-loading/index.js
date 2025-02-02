// @flow

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MixedElement } from 'react';

const css = `
.blockera-panel-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 400px;
	margin: 0;
}

.blockera-panel-loading .blockera-loading-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
}

.blockera-panel-loading .blockera-loading-container .blockera-loading-text {
	font-size: 14px;
	color: #9a9a9a;
	font-weight: 400;
}

.blockera-panel-loading .blockera-loading-container .blockera-panel-loading-logo {
	width: 70px;
	height: 70px;
	display: inline-block;
	fill: #c3c3c3;
}

.blockera-panel-loading .blockera-loading-container .blockera-panel-loading-logo .side-left {
	animation: blockera-loading-side 1s infinite ease-in-out 300ms;
}

.blockera-panel-loading .blockera-loading-container .blockera-panel-loading-logo .side-top {
	animation: blockera-loading-side 1s infinite ease-in-out 600ms;
}

.blockera-panel-loading .blockera-loading-container .blockera-panel-loading-logo .side-right {
	animation: blockera-loading-side 1s infinite ease-in-out 900ms;
}

@keyframes blockera-loading-side {
	0% {
		fill: #0051E7;
	}

	50% {
		fill: #c3c3c3;
	}

	100% {
		fill: #0051E7;
	}
}
`;

export const BlockeraLoading = ({
	text = __('Loading…', 'blockera'),
}: {
	text: string,
}): MixedElement => {
	return (
		<>
			<div id="blockera-admin-settings-container">
				<div className="blockera-panel-loading">
					<div className="blockera-loading-container">
						<svg
							className="blockera-panel-loading-logo"
							width="50"
							height="50"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="side-left"
								d="M11.2174 16.0263V12.5046L3 7.76038V16.7608L11.2174 21.5049V18.3741V16.0263Z"
							/>
							<path
								className="side-top"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M20.1333 6.69565L12 11.3913L3.86676 6.69565L12 2L20.1333 6.69565Z"
							/>
							<path
								className="side-right"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21 7.76038L12.7826 12.5046V21.5045L21 16.7604V7.76038Z"
							/>
						</svg>

						<div
							data-test="blockera-loading-text"
							className="blockera-loading-text"
						>
							{text}
						</div>
					</div>
				</div>
			</div>
			<style>{css}</style>
		</>
	);
};

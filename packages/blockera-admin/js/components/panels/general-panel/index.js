// @flow

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import type { MixedElement } from 'react';
import { useContext, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Blockera dependencies
 */
import { TabsContext, SettingsContext } from '@blockera/wordpress';
import {
	Button,
	Flex,
	ToggleControl,
	ControlContextProvider,
} from '@blockera/controls';
import { Icon } from '@blockera/icons';

/**
 * Internal dependencies
 */
import { BlockVisibility } from './block-visibility';

// here store fallback default values for tab general settings.
const fallbackDefaultValue = {
	disableProHints: false,
};

export const GeneralPanel = (): MixedElement => {
	const { defaultSettings, config } = useContext(SettingsContext);
	const { settings, setSettings, setHasUpdates } = useContext(TabsContext);
	const generalSettings =
		settings?.general || defaultSettings?.general || fallbackDefaultValue;
	const {
		blockeraSettings: { general: savedGeneralSettings },
	} = window;

	const { blockeraAdminNonce } = window;
	const [regenerated, setRegenerated] = useState(false);
	const [loading, setLoading] = useState({
		regenerated: false,
		regenerating: false,
		error: false,
	});

	const regenerateAssets = () => {
		setLoading({
			regenerated: false,
			regenerating: true,
			error: false,
		});

		apiFetch({
			method: 'POST',
			path: '/blockera/v1/regenerate-assets',
			headers: {
				'X-Blockera-Nonce': blockeraAdminNonce,
			},
			data: {
				action: 'regenerate-assets',
			},
		})
			.then((response) => {
				if (response.success) {
					setRegenerated(response.data);

					setLoading({
						regenerated: true,
						regenerating: false,
					});
				} else {
					setLoading({
						regenerated: false,
						regenerating: false,
						error: true,
					});
				}
			})
			.catch(() => {
				setLoading({
					regenerated: false,
					regenerating: false,
					error: true,
				});
			});
	};

	return (
		<Flex
			direction={'column'}
			className={'blockera-settings-panel-container'}
			gap={40}
		>
			<BlockVisibility
				config={config}
				settings={settings}
				setSettings={setSettings}
				setHasUpdates={setHasUpdates}
				generalSettings={generalSettings}
				savedGeneralSettings={savedGeneralSettings}
			/>

			<Flex direction={'column'} className={'blockera-settings-section'}>
				<h3 className={'blockera-settings-general section-title'}>
					<Icon
						icon={'trash'}
						iconSize={28}
						style={{
							color: 'var(--blockera-controls-primary-color)',
						}}
					/>
					{__('Purge Cache and Regenerate Assets', 'blockera')}
				</h3>

				<p className={'blockera-settings-general section-desc'}>
					{__(
						'By clicking the button below, you can regenerate the assets for the current website. This action will clear the cache and regenerate the assets. After each plugin update, the cache will be purged automatically.',
						'blockera'
					)}
				</p>

				<div className={'blockera-settings-general control-wrapper'}>
					<Flex direction={'row'} gap={20} alignItems="center">
						<Button
							disabled={
								regenerated ||
								loading.regenerating ||
								loading.error
							}
							onClick={regenerateAssets}
							className={'blockera-settings-general control'}
							variant={'primary'}
							style={{
								width: 'fit-content',
							}}
							isBusy={loading.regenerating}
						>
							{__('Purge Cache', 'blockera')}
						</Button>

						{loading.error && (
							<p
								className={
									'blockera-settings-general section-desc'
								}
								style={{
									margin: '0',
									color: 'rgb(255 0 0)',
								}}
							>
								{__(
									'An error occurred while purging the cache.',
									'blockera'
								)}
							</p>
						)}

						{loading.regenerating && (
							<p
								className={
									'blockera-settings-general section-desc'
								}
								style={{
									margin: '0',
								}}
							>
								{__('Purging cache …', 'blockera')}
							</p>
						)}

						{loading.regenerated && (
							<p
								className={
									'blockera-settings-general section-desc'
								}
								style={{
									color: 'rgb(0 140 80)',
									margin: '0',
								}}
							>
								{__(
									'Assets cache has been purged.',
									'blockera'
								)}
							</p>
						)}
					</Flex>
				</div>
			</Flex>

			<Flex direction={'column'} className={'blockera-settings-section'}>
				<h3 className={'blockera-settings-general section-title'}>
					<Icon
						icon={'globe'}
						library={'wp'}
						iconSize={24}
						style={{
							color: 'var(--blockera-controls-primary-color)',
						}}
					/>

					{__('Other Settings', 'blockera')}
				</h3>

				<p className={'blockera-settings-general section-desc'}>
					{__(
						'Discover advanced settings for fine-tuning your website with ease.',
						'blockera'
					)}
				</p>

				<div
					className={'blockera-settings-general control-wrapper'}
					aria-label={__(
						'Opt out of PRO hints and promotions',
						'blockera'
					)}
				>
					<ControlContextProvider
						value={{
							name: 'toggleProHints',
							value: generalSettings.disableProHints,
						}}
					>
						<ToggleControl
							// TODO: Convert to advanced labelType. to display for user is changed value or not!
							labelType={'self'}
							id={'toggleProHints'}
							className={'blockera-settings-general control'}
							defaultValue={generalSettings.disableProHints}
							onChange={(checked: boolean) => {
								setHasUpdates(
									checked !==
										savedGeneralSettings.disableProHints
								);

								setSettings({
									...settings,
									general: {
										...generalSettings,
										disableProHints: checked,
									},
								});
							}}
							label={
								<strong
									className={
										'blockera-settings-general control-label'
									}
								>
									{__(
										'Opt out of Pro version hints and promotions',
										'blockera'
									)}
								</strong>
							}
						/>
					</ControlContextProvider>
				</div>
			</Flex>
		</Flex>
	);
};

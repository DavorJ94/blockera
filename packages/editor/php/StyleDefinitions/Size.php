<?php

namespace Blockera\Editor\StyleDefinitions;

/**
 * Class Size definition to generate size css rule.
 *
 * @package Size
 */
class Size extends BaseStyleDefinition {

	/**
	 * Collect all css selectors and declarations.
	 *
	 * @param array $setting the block setting.
	 *
	 * @return array
	 */
	protected function css( array $setting ): array {

		$declaration = [];
		$cssProperty = $setting['type'];

		if ( empty( $cssProperty ) ) {

			return $declaration;
		}

		$this->setSelector( $cssProperty );

		switch ( $cssProperty ) {

			case 'aspect-ratio':
				if ( 'custom' === $setting[ $cssProperty ]['value'] ) {

					$declaration[ $cssProperty ] = sprintf(
						'%1$s%2$s%3$s',
						$setting[ $cssProperty ]['width'],
						! empty( $setting[ $cssProperty ]['width'] ) && ! empty( $setting[ $cssProperty ]['height'] ) ? ' / ' : '',
						$setting[ $cssProperty ]['height']
					);

				} else {

					$declaration[ $cssProperty ] = $setting[ $cssProperty ]['value'];
				}

				$this->setCss( $declaration );

				break;

			case 'object-position':
				$declaration[ $cssProperty ] = sprintf(
					'%1$s %2$s%3$s',
					$setting[ $cssProperty ]['top'],
					$setting[ $cssProperty ]['left']
				);

				$this->setCss( $declaration );
				break;

			default:
				$declaration[ $cssProperty ] = blockera_get_value_addon_real_value( $setting[ $cssProperty ] );

				$this->setCss( $declaration );
				break;
		}

		return $this->css;
	}

	/**
	 * Get allowed reserved properties.
	 *
	 * @return array
	 */
	public function getAllowedProperties(): array {

		return [
			'blockeraWidth'       => 'width',
			'blockeraMinWidth'    => 'min-width',
			'blockeraMaxWidth'    => 'max-width',
			'blockeraHeight'      => 'height',
			'blockeraMinHeight'   => 'min-height',
			'blockeraMaxHeight'   => 'max-height',
			'blockeraOverflow'    => 'overflow',
			'blockeraFit'         => 'object-fit',
			'blockeraRatio'       => 'aspect-ratio',
			'blockeraFitPosition' => 'object-position',
		];
	}

	/**
	 * Calculation fallback feature id.
	 * To be compatible with WordPress block selectors.
	 *
	 * @param string $cssProperty The css property key.
	 *
	 * @return string The path to fallback feature id.
	 */
	protected function calculateFallbackFeatureId( string $cssProperty ): string {

		$paths = [
			'min-width'    => 'dimensions.minWidth',
			'min-height'   => 'dimensions.minHeight',
			'aspect-ratio' => 'dimensions.aspectRatio',
		];

		return $paths[ $cssProperty ] ?? '';
	}

}

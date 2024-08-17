<?php

namespace Blockera\Editor\StyleDefinitions;

/**
 * A Typography class for generate typography css styles.
 *
 * @package Blockera\Editor\StyleDefinition\Typography
 */
class Typography extends BaseStyleDefinition {

	/**
	 * Hold collection of options to generate style
	 *
	 * @var array
	 */
	protected array $options = [
		'is-important' => true,
	];

	/**
	 * @inheritDoc
	 *
	 * @param array $setting
	 *
	 * @return array
	 */
	protected function css( array $setting ): array {

		$declaration = [];
		$cssProperty = $setting['type'];

		if ( empty( $cssProperty ) ) {

			return $declaration;
		}

		$propertyValue = $setting[ $cssProperty ];

		$this->setSelector( $cssProperty );

		switch ( $cssProperty ) {

			case 'text-orientation':
				switch ( $propertyValue ) {
					case 'style-1':
						$declaration['writing-mode']     = 'vertical-lr';
						$declaration['text-orientation'] = 'mixed';
						break;
					case 'style-2':
						$declaration['writing-mode']     = 'vertical-rl';
						$declaration['text-orientation'] = 'mixed';
						break;
					case 'style-3':
						$declaration['writing-mode']     = 'vertical-lr';
						$declaration['text-orientation'] = 'upright';
						break;
					case 'style-4':
						$declaration['writing-mode']     = 'vertical-rl';
						$declaration['text-orientation'] = 'upright';
						break;
					case 'initial':
						$declaration['writing-mode']     =
							'horizontal-tb';
						$declaration['text-orientation'] = 'mixed';
				}
				break;

			case '-webkit-text-stroke-color':
				$color = blockera_get_value_addon_real_value( $propertyValue['color'] );

				if ( ! empty( $color ) ) {

					$declaration['-webkit-text-stroke-color'] = $color;

					if ( ! empty( $propertyValue['width'] ) ) {
						$declaration['-webkit-text-stroke-width'] = $propertyValue['width'];
					}
				}

				break;

			case 'column-count':
				if ( ! empty( $propertyValue['columns'] ) ) {
					$declaration['column-count'] = 'none' === $propertyValue['columns'] ? 'initial' : preg_replace( '/\b-columns\b/i', '', $propertyValue['columns'] );

					if ( 'initial' !== $declaration['column-count'] ) {
						if ( ! empty( $propertyValue['gap'] ) ) {
							$declaration['column-gap'] = $propertyValue['gap'];
						}

						if ( ! empty( $propertyValue['divider']['width'] ) ) {

							$color = blockera_get_value_addon_real_value( $propertyValue['divider']['color'] );

							if ( $color ) {
								$declaration['column-rule-color'] = $color;
							}

							$declaration['column-rule-style'] = $propertyValue['divider']['style'] ?? 'solid';
							$declaration['column-rule-width'] = $propertyValue['divider']['width'];
						}
					}
				}

				break;

			case 'word-break':
			case 'direction':
			case 'text-transform':
			case 'font-style':
			case 'text-decoration':
			case 'color':
			case '-webkit-text-stroke-width':
			case 'letter-spacing':
			case 'word-spacing':
			case 'line-height':
			case 'text-indent':
			case 'font-size':
				$declaration[ $cssProperty ] = $propertyValue ? blockera_get_value_addon_real_value( $propertyValue ) : '';
				break;

		}

		$this->setCss( $declaration );

		return $this->css;
	}

	/**
	 * @inheritDoc
	 *
	 * @return string[]
	 */
	public function getAllowedProperties(): array {

		return [
			'blockeraFontColor'       => 'color',
			'blockeraFontSize'        => 'font-size',
			'blockeraDirection'       => 'direction',
			'blockeraTextAlign'       => 'text-align',
			'blockeraFontStyle'       => 'font-style',
			'blockeraWordBreak'       => 'word-break',
			'blockeraTextIndent'      => 'text-indent',
			'blockeraLineHeight'      => 'line-height',
			'blockeraWordSpacing'     => 'word-spacing',
			'blockeraTextColumns'     => 'column-count',
			'blockeraTextTransform'   => 'text-transform',
			'blockeraLetterSpacing'   => 'letter-spacing',
			'blockeraTextDecoration'  => 'text-decoration',
			'blockeraTextOrientation' => 'text-orientation',
			'blockeraTextStroke'      => '-webkit-text-stroke-color',
		];
	}

}

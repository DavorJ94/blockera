<?php
/**
 * Configure block all arguments.
 *
 * @var array $args the block arguments!
 *
 * @package blockera/packages/blocks/js/wordpress/footnotes
 */

return array_merge(
	$args,
	[
		'selectors' => [
			...( $args['selectors'] ?? [] ),
			'innerBlocks' => [
				'link' => [
					'root' => 'a:not(.wp-element-button)',
				],
			],
		],
	]
);

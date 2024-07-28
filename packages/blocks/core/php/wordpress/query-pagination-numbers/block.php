<?php
/**
 * Configure block all arguments.
 *
 * @var array $args the block arguments!
 *
 * @package blockera/packages/blocks/js/wordpress/query-pagination-numbers
 */

return array_merge(
	$args,
	[
		'selectors' => array_merge(
			$args['selectors'] ?? [],
			[
				'innerBlocks' => [
					'numbers' => [
						'root' => '.page-numbers:not(.dots)',
					],
					'current' => [
						'root' => '.page-numbers.current',
					],
					'dots'    => [
						'root' => '.page-numbers.dots',
					],
				],
			]
		),
	]
);

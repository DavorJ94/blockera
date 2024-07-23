<?php
/**
 * Configure block all arguments.
 *
 * @var array $args the block arguments!
 *
 * @package blockera/packages/blocks/js/wordpress/comment-date
 */

return array_merge(
	$args,
	[
		'selectors' => array_merge(
			$args['selectors'] ?? [],
			[
				'innerBlocks' => [
					'link' => [
						'root' => 'a:not(.wp-element-button)',
					],
				],
			]
		),
	]
);

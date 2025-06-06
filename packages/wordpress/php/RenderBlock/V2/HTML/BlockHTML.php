<?php

namespace Blockera\WordPress\RenderBlock\V2\HTML;

use Blockera\Bootstrap\Application;
use Blockera\WordPress\RenderBlock\V2\HTML\Contracts\BlockHandler;

/**
 * The default chaining behavior can be implemented inside a base BlockHTML class.
 */
// phpcs:disable
abstract class BlockHTML implements BlockHandler
{
    /**
     * @var Application
     */
    protected Application $app;

    /**
     * @param Application $app
     */
    public function __construct(Application $app)
    {

        $this->app = $app;
    }

    /**
     * @var BlockHandler|null
     */
    protected $nextHandler = null;

    public function setNext(BlockHandler $handler): BlockHandler
    {

        $this->nextHandler = $handler;

        return $handler;
    }

    public function manipulate(array $request): void
    {

        if (! $this->nextHandler) {

            return;
        }

        $this->nextHandler->manipulate($request);
    }

    /**
     * Retrieve normal icon name.
     *
     * @param string $icon
     *
     * @return string
     */
    protected function getIcon(string $icon): string
    {

        $isNormalIcon = preg_match('/^([a-z]*)([A-Z][a-z]*)([A-Z][a-z]*)/', $icon, $matches);

        if (! $isNormalIcon) {

            return $icon;
        }

        $iconName = '';

        foreach ($matches as $key => $match) {

            if (! $key) {
                continue;
            }

            if (count($matches) - 1 === $key) {
                $iconName .= strtolower($match);

                continue;
            }

            $iconName .= strtolower($match) . '-';
        }

        return $iconName;
    }
}

<?php

if ( ! function_exists( 'blockera_get_block_type' ) ) {

	/**
	 * Get WordPress block type instance by name.
	 *
	 * @param string $name The block type name.
	 *
	 * @return WP_Block_Type | null The WP_Block_Type instance object.
	 */
	function blockera_get_block_type( string $name ): ?WP_Block_Type {

		return WP_Block_Type_Registry::get_instance()->get_registered( $name );
	}
}

if ( ! function_exists( 'blockera_get_block_type_property' ) ) {

	/**
	 * Retrieve block type mapped selectors array.
	 *
	 * @param string $name          the block name.
	 * @param string $property_name the block property name.
	 *
	 * @return mixed the block type property value.
	 */
	function blockera_get_block_type_property( string $name, string $property_name ) {

		$registered = blockera_get_block_type( $name );

		if ( null === $registered || ! property_exists( $registered, $property_name ) ) {

			return [];
		}

		return $registered->$property_name;
	}
}

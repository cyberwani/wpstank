<?php

add_action( 'init', 'create_{{post-type-slug}}_post_type' );

function create_{{post-type-slug}}_post_type() {

  global $defaults;

  register_post_type( '{{post-type-slug}}', array_merge( $defaults, array(
      'labels' => array(
        'name' => ('{{post-types}}',
        'singular_name' => '{{post-type}}',
        'add_new' => 'Add New', '{{post-type}}',
        'add_new_item' => 'Add New {{post-type}}',
        'edit_item' => 'Edit {{post-type}}',
        'new_item' => 'New {{post-type}}',
        'view_item' => 'View {{post-type}}',
        'search_items' => 'Search {{post-types}}',
        'not_found' =>  'No {{post-types}} found',
        'not_found_in_trash' => 'No {{post-types}} found in Trash', 
        'parent_item_colon' => '',
        'menu_name' => '{{post-types}}'
      ),
      'public' => true,
      'capability_type' => 'post',
      'show_in_menu' => true, 
      'hierarchical' => false,
      'menu_position' => 100,
      'supports' => array('title', 'editor', 'thumbnail', 'revisions')
      ) 
    ) 
  );
}

/**
 * Manage all the columns for each custom post type.
 */
 
add_filter('manage_edit-{{post-type-slug}}_columns'  , 'add_new_{{post-type-slug}}_columns');

function add_new_{{post-type-slug}}_columns( $columns ) {
  
  $offset = 2;

  $new_columns = array(
    'order'  => 'Order',
  );

  return array_splice($columns, 0, $offset) + $new_columns + $columns;

}

<?php

add_action( 'init', 'create_{{slug}}_post_type' );

function create_{{slug}}_post_type() {

  register_post_type( '{{slug}}', array(
      'labels' => array(
        'name' => '{{plural}}',
        'singular_name' => '{{singular}}',
        'add_new' => 'Add New', '{{singular}}',
        'add_new_item' => 'Add New {{singular}}',
        'edit_item' => 'Edit {{singular}}',
        'new_item' => 'New {{singular}}',
        'view_item' => 'View {{singular}}',
        'search_items' => 'Search {{plural}}',
        'not_found' =>  'No {{plural}} found',
        'not_found_in_trash' => 'No {{plural}} found in Trash', 
        'parent_item_colon' => '',
        'menu_name' => '{{plural}}'
      ),
      'public' => true,
      'capability_type' => 'post',
      'show_in_menu' => true, 
      'hierarchical' => false,
      'menu_position' => 100,
      'supports' => array('title', 'editor', 'thumbnail', 'revisions') 
    )
  );
}

/**
 * Manage all the columns for each custom post type.
 */
 
add_filter('manage_edit-{{slug}}_columns'  , 'add_new_{{slug}}_columns');

function add_new_{{slug}}_columns( $columns ) {
  
  $offset = 2;

  $new_columns = array(
    'order'  => 'Order',
    'image'  => 'Image',
  );

  return array_splice($columns, 0, $offset) + $new_columns + $columns;

}

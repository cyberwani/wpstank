<?php

add_action( 'init', 'create_{{postType-slug}}_post_type' );

function create_{{postType-slug}}_post_type() {

  register_post_type( '{{postType-slug}}', array(
      'labels' => array(
        'name' => '{{postTypes}}',
        'singular_name' => '{{postType}}',
        'add_new' => 'Add New', '{{postType}}',
        'add_new_item' => 'Add New {{postType}}',
        'edit_item' => 'Edit {{postType}}',
        'new_item' => 'New {{postType}}',
        'view_item' => 'View {{postType}}',
        'search_items' => 'Search {{postTypes}}',
        'not_found' =>  'No {{postTypes}} found',
        'not_found_in_trash' => 'No {{postTypes}} found in Trash', 
        'parent_item_colon' => '',
        'menu_name' => '{{postTypes}}'
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
 
add_filter('manage_edit-{{postType-slug}}_columns'  , 'add_new_{{postType-slug}}_columns');

function add_new_{{postType-slug}}_columns( $columns ) {
  
  $offset = 2;

  $new_columns = array(
    'order'  => 'Order',
    'image'  => 'Image',
  );

  return array_splice($columns, 0, $offset) + $new_columns + $columns;

}

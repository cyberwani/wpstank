<?php

add_action( 'init', 'create_{{posttype-slug}}_post_type' );

function create_{{posttype-slug}}_post_type() {

  register_post_type( '{{posttype-slug}}', array(
      'labels' => array(
        'name' => '{{posttypes}}',
        'singular_name' => '{{posttype}}',
        'add_new' => 'Add New', '{{posttype}}',
        'add_new_item' => 'Add New {{posttype}}',
        'edit_item' => 'Edit {{posttype}}',
        'new_item' => 'New {{posttype}}',
        'view_item' => 'View {{posttype}}',
        'search_items' => 'Search {{posttypes}}',
        'not_found' =>  'No {{posttypes}} found',
        'not_found_in_trash' => 'No {{posttypes}} found in Trash', 
        'parent_item_colon' => '',
        'menu_name' => '{{posttypes}}'
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
 
add_filter('manage_edit-{{posttype-slug}}_columns'  , 'add_new_{{posttype-slug}}_columns');

function add_new_{{posttype-slug}}_columns( $columns ) {
  
  $offset = 2;

  $new_columns = array(
    'order'  => 'Order',
    'image'  => 'Image',
  );

  return array_splice($columns, 0, $offset) + $new_columns + $columns;

}

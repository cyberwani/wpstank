<?php 

$labels = array(
    'name'                => '{{plural}}',
    'singular_name'       => '{{singular}}',
    'search_items'        => 'Search {{plural}}',
    'all_items'           => 'All {{plural}}',
    'parent_item'         => 'Parent {{singular}}',
    'parent_item_colon'   => 'Parent {{singular}}:',
    'edit_item'           => 'Edit {{singular}}', 
    'update_item'         => 'Update {{singular}}',
    'add_new_item'        => 'Add New {{singular}}',
    'new_item_name'       => 'New {{singular}} Name',
    'menu_name'           => '{{singular}}'
); 	

$args = array(
    'hierarchical'        => true,
    'labels'              => $labels,
    'show_ui'             => true,
    'show_admin_column'   => true,
    'query_var'           => true,
);

register_singular( '{{slug}}', array( '{{posttype}}' ), $args );

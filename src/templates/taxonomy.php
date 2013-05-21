<?php 

$labels = array(
    'name'                => '{{taxonomies}}',
    'singular_name'       => '{{taxonomy}}',
    'search_items'        => 'Search {{taxonomies}}',
    'all_items'           => 'All {{taxonomies}}',
    'parent_item'         => 'Parent {{taxonomy}}',
    'parent_item_colon'   => 'Parent {{taxonomy}}:',
    'edit_item'           => 'Edit {{taxonomy}}', 
    'update_item'         => 'Update {{taxonomy}}',
    'add_new_item'        => 'Add New {{taxonomy}}',
    'new_item_name'       => 'New {{taxonomy}} Name',
    'menu_name'           => '{{taxonomy}}'
); 	

$args = array(
    'hierarchical'        => true,
    'labels'              => $labels,
    'show_ui'             => true,
    'show_admin_column'   => true,
    'query_var'           => true,
);

register_taxonomy( '{{taxonomy-slug}}', array( '{{post-type}}' ), $args );

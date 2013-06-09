<?php 

add_shortcode('{{shortcode-slug}}', 'shortcode_{{shortcode-slug}}');

function shortcode_{{shortcode-slug}}( $atts ) {
    extract(shortcode_atts(array(
        'default' => 'args'
    ), $atts));

    // Get busy.

    return 0;
}

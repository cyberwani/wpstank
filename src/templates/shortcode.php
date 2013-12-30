<?php 

add_shortcode('{{slug}}', 'shortcode_{{slug}}');

function shortcode_{{slug}}( $atts, $content = null ) {
    extract(shortcode_atts(array(
        'default' => 'args'
    ), $atts));

    // Get busy.

    return 0;
}

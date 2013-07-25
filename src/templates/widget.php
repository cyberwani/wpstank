<?php

add_action('widgets_init', create_function('', 'return register_widget("{{widget-slug}}");'));

class {{widget-slug}} extends WP_Widget {
    /** constructor */
    function {{widget-slug}}() {
      parent::WP_Widget(false, $name = '{{Widget}}', array( 'description' => ''));
    }

    /** @see WP_Widget::widget */
    function widget($args, $instance) {
      global $post;
      extract( $args );
      extract( $instance );

      $title = apply_filters('widget_title', $instance['title']);
        ?>
        
        <?php echo $before_widget ; ?>

        <?php echo $before_title . $title . $after_title; ?>

        <?php 

        // Get Busy.

        ?>
        
        <?php echo $after_widget; ?>

      <?php
    }

    /** @see WP_Widget::update */
    function update($new_instance, $old_instance) {
      $instance['title']        = strip_tags($new_instance['title']);
      return $instance;
    }

    /** @see WP_Widget::form */
    function form($instance) {
      $title        = esc_attr($instance['title']);
      ?>
      <p>
        <label for="<?php echo $this->get_field_id('title'); ?>">Title:</label> 
        <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
      </p>
    <?php
    }

} // class {{widget-slug}}

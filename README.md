# wpstank

`wpstank` is a command line tool for any WordPress theme developer. `wpstank` generates custom post types, taxonomies, widgets, and shortcodes based on templates that you specify.

## Installation

Before you begin make sure `node` and `npm` are installed on your machine.

```
npm install -g wpstank
```

You should have access to the `wpstank` binary from the command line.
Double check your `PATH` variable if `wpstank` isn't loaded.

## Getting Started

### Initialize 

Navigate to your WordPress theme directory. Initialize `wpstank` with the following command.

    wpstank init

Several files are created once you run the `init` command inside your current working directory.

    .wpstank.json               # settings
    .wpstank/
    .wpstank/posttype.php       # template file
    .wpstank/shortcode.php      # template file
    .wpstank/taxonomy.php       # template file
    .wpstank/widget.php         # template file

If you look inside `.wpstank/posttype.php` you see the template.

```php
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
```

### Generate

Begin by creating a new post type using **any** of the following commands:

    wpstank --generate --post-type event
    wpstank -g -p event
    wpstank -gp event

The file `event.php` is added to a newly created directory `library/php/cpt/`. If you pop open the file we see that all the `{{singular}}`, `{{plural}}`, and `{{slug}}` variables are relaced with `Event`, `Events`, and `event`.

```php
    <?php

    add_action( 'init', 'create_event_post_type' );

    function create_event_post_type() {

      register_post_type( 'event', array(
          'labels' => array(
            'name' => 'Events',
            'singular_name' => 'Event',
            'add_new' => 'Add New', 'Event',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'new_item' => 'New Event',
            'view_item' => 'View Event',
            'search_items' => 'Search Events',
            'not_found' =>  'No Events found',
            'not_found_in_trash' => 'No Events found in Trash',
            'parent_item_colon' => '',
            'menu_name' => 'Events'
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
```

### Destroy

Want to delete a file? Good! 

Delete a post type using **any** of the following commands:

    wpstank --destroy --post-type event
    wpstank -d -p event
    wpstank -dp event

The file `event.php` is deleted from the directory `library/php/cpt/`.


### Customize

Don't like the template files we use? Don't like the location `wpstank` generates new files? Want to generate new files? Great, just change it!

#### Change output directories

`.wpstank.json` contains your configuration settings for output directories. 

    {
        "types": {
            "postType": "library/php/cpt",
            "taxonomy": "library/php/taxonomy",
            "shortcode": "library/php/shortcode",
            "widget": "library/php/widget"
        }
    }

Edit the configurations to your liking. Just make sure `.wpstank.json` is valid JSON.

#### Change the templates

Templates are stored in the `.wpstank` directory.

    .wpstank/
    .wpstank/posttype.php       # template file
    .wpstank/shortcode.php      # template file
    .wpstank/taxonomy.php       # template file
    .wpstank/widget.php         # template file

Feel free to add, delete or update any code in the template files. Each template uses handle bar style variables for the resource names. If you look inside `.wpstank/posttype.php` you see the following variables:

    {{singular}}     # singular
    {{plural}}       # plural
    {{slug}}         # singluar and lowercase

`wpstank` replaces the variable placeholders with the singular, plural, and slugified version of the `event` resource name. For example, if we created a new custom post type called **event** the template variables are transformed:

    {{singular}}     => Event
    {{plural}}       => Events
    {{slug}}         => event

#### Adding a new template

Say you want to use `wpstank` to create page templates. The output directory for pages is `pages/`.

1. Add the resource name and template directory to `.wpstank.json`


        {
            "types": {
                "postType": "library/php/cpt",
                "taxonomy": "library/php/taxonomy",
                "shortcode": "library/php/shortcode",
                "widget": "library/php/widget",
                "page": "pages"
            }
        }


1. Add the `page` template to `.wpstank/page.php`. Utilize the placeholder variables, if you need them.

        {{singular}}
        {{plural}}
        {{slug}}

1. Generate the page with the `-c` flag

        wpstank -gc page:staff


## Need Help?

`wpstank` has several different options. Use the `wpstank --help` flag to see all the options.


    Usage: wpstank [options] [command]

    Commands:

      init                   Setup stank

    Options:

      -h, --help                output usage information
      -V, --version             output the version number
      -g, --generate            Generate a file
      -d, --destroy             Delete a file
      -f, --force               Force to overwrite a file
      -p, --posttype [name]     Post Type
      -s, --shortcode [name]    Shortcode
      -w, --widget [name]       Widget
      -t, --taxonomy [name]     Taxonomy
      -c, --custom <type:name>  Custom template


## Contributing

1. Fork it
1. Create a feature branch
1. Send a pull request

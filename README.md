# WP Stank

A command line interface for any WordPress theme developer. WP Stank generates scaffolding for:

1. custom post types
1. taxonomies
1. shortcodes

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

`wpstank` has several different options. Use the `wpstank --help` flag to see all the options.

  
    Usage: wpstank [options] [command]
  
    Commands:
  
      init                   Setup stank
  
    Options:
  
      -h, --help              output usage information
      -V, --version           output the version number
      -g, --generate          Generate a file
      -d, --destroy           Delete a file
      -p, --post-type [type]  Post Type
      -s, --shortcode [type]  Shortcode
      -t, --taxonomy [type]   Taxonomy
  


Several files are created once you run the `init` command inside your current working directory.

    .wpstank.json                # settings
    .wpstank/
    .wpstank/post-type.php      # template file
    .wpstank/shortcode.php      # template file
    .wpstank/taxonomy.php       # template file

### Generate

Begin by creating a new post type using **any** of the following commands:

    wpstank --generate --post-type event
    wpstank -g -p event
    wpstank -gp event

The file `event.php` is added to a newly created directory `library/php/cpt/`.

### Destroy

Delete a post type using **any** of the following commands:

    wpstank --destroy --post-type event
    wpstank -d -p event
    wpstank -dp event

The file `event.php` is deleted from the directory `library/php/cpt/`.


### Customize

Don't like the template files we use? Don't like the location `wpstank` generates new files? Great, just change it!

#### Change output directories

`.wpstank.json` contains your configuration settings for output directories. 

    {
        "types": {
            "postType": "library/php/cpt",
            "taxonomy": "library/php/taxonomy",
            "shortcode": "library/php/shortcode"
        }
    }

Edit the configurations to your liking. Just make sure `.wpstank.json` is valid JSON.

#### Change the templates

Templates are stored in the `.wpstank` directory. 


## Todos
1. Test to make sure settings are editable

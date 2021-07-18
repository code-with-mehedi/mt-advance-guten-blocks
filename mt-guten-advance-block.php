<?php
/**
 * Plugin Name: MT-Guten Advance Blocks
 * Plugin URI:  #
 * Description: Advance guten blocks
 * Version:     1.0
 * Author:      Mehedi Hasan
 * Author URI:  https://codewithmehedi.com
 * Text Domain: mtgtab
 * Domain Path: /languages
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * @wordpress-plugin
 * Prefix:      mtgtab
 */

defined( 'ABSPATH' ) || die( 'No script kiddies please!' );

// add_action( 'plugins_loaded', 'Plugin Functions Prefix_plugin_init' );
// /**
//  * Load localization files
//  *
//  * @return void
//  */
// function Plugin Functions Prefix_plugin_init() {
//     load_plugin_textdomain( 'Plugin Slug', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
// }

class Mtgtab_assets {
    function __construct()
    {
        add_action('init',[$this,'mtgtab_enqueue_assets']);
        add_filter('block_categories',[$this,'mtgtab_new_category'],10,2);
        add_filter( 'rest_prepare_post', [$this,'post_featured_image_json'], 10, 3 );

    }

    function mtgtab_enqueue_assets() {
        //register the block editor scripts
        wp_register_script( 'mtgtab-editor-script', 
        plugin_dir_url(__FILE__).'./build/index.js', 
        ['wp-blocks','wp-i18n','wp-element','wp-editor'],
         filemtime( plugin_dir_path( __FILE__ ).'build/index.js'),
        );

        //register_editor_style

        wp_register_style( 'mtgtab-editor-style', 
        plugin_dir_url( __FILE__ ).'./src/editor.css');

        //register front-end style
        wp_register_style( 'mtgtab-frontend-style', 
        plugin_dir_url( __FILE__ ).'./src/style.css');

        //an array of blocks
        $blocs=[
            'mtgtab/testimonial',
            'mtgtab/hero',
            'mtgtab/image-with-text',
            
        ];

        //add the blocks and resgister the stylesheets
        foreach( $blocs as $block ){
            register_block_type( $block, 
            [
                'editor_script'=>'mtgtab-editor-script',
                'editor_style'=>'mtgtab-editor-style',
                'style'=>'mtgtab-frontend-style',
                
            ]);
        }
        //register latest post block
        register_block_type( "mtgtab/latest-post",array(
            'editor_script'=>'mtgtab-editor-script',
            'editor_style'=>'mtgtab-editor-style',
            'style'=>'mtgtab-frontend-style',   
            'render_callback'=>'mt_latest_posts_render',
            'attributes'      => [
					'numberOfPosts' => [
						'type'    => 'number',
						'default' => 3,
					],
                    'postCategories'=>[
                        'type'=>'string'
                    ]
				],

        ) );
        /**Callback latest post */
        function mt_latest_posts_render($attributes){
            $attributes = wp_parse_args( $attributes, [] );
            $numpost= intval($attributes['numberOfPosts']);
            $categories=$attributes['postCategories'];
            //echo $categories;
            //post response 
            global $post;
            $recentPosts=wp_get_recent_posts( array(
                'post_type'=>'post',
                'numberposts'=>$numpost,
                'post_status'=>'publish',
                'cat'=>$categories

            ));
            if(count($recentPosts)===0){
                return "There is no post";
            }
            // Response that is going to be rendered
            $body = '';
            $body .= '<div class="latest-post-container"><h1 class="latest-posts-heading">Latest Posts</h1>';
            $body .= '<ul class="latest-posts container">';

            foreach($recentPosts as $rpost) {
                // Get the post object
                $post = get_post($rpost['ID']);
                setup_postdata($post);

                // Build the template
                $body .= sprintf(
                    '<li>   
                        %1$s
                        <div class="content">
                            <h2>%2$s</h2>
                            <p>%3$s</p>
                            <a href="%4$s" class="button">Read More</a>
                        </div>
                    </li>', 
                    get_the_post_thumbnail($post), 
                    esc_html(get_the_title($post)),
                    esc_html( wp_trim_words(get_the_content($post), 30 ) ),
                    esc_url( get_the_permalink($post) )
                );
                wp_reset_postdata();
            } // endforeach
            $body .= '</ul> </div>';

            return $body;
        }
    }

    /**
     *  Register new category for gutenberg
     */
    function mtgtab_new_category($categories,$post) {
        return array_merge(
        $categories,
        array(
            array(

            'slug'=> 'mt-blocks',
            'title'=> __('MT Blocks', 'mtgtab'),
            'icon'=>  'wordpress',
        ))
        );
    }
    /** Add featured image URL to post rest api */
    function post_featured_image_json( $data, $post, $context ) {
        $featured_image_id = $data->data['featured_media']; // get featured image id
        $featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'original' ); // get url of the original size

        if( $featured_image_url ) {
            $data->data['featured_image_url'] = $featured_image_url[0];
        }

        return $data;
    }
    


}

$mtgtab_init= new Mtgtab_assets();


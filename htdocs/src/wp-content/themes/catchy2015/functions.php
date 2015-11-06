<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'theme_name_scripts' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	/**
	 * Proper way to enqueue scripts and styles
	 */

	// // load css into the website's front-end
	// function mytheme_enqueue_style() {
	//     wp_enqueue_style( 'mytheme-style', get_stylesheet_uri() ); 
	// }
	// add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_style' );

	// // load css into the admin pages
	// function mytheme_enqueue_options_style() {
	//     wp_enqueue_style( 'mytheme-options-style', get_template_directory_uri() . '/css/admin.css' ); 
	// }
	// add_action( 'admin_enqueue_scripts', 'mytheme_enqueue_options_style' );
	 
	// // load css into the login page
	// function mytheme_enqueue_login_style() {
	//     wp_enqueue_style( 'mytheme-options-style', get_template_directory_uri() . '/css/login.css' ); 
	// }
	// add_action( 'login_enqueue_scripts', 'mytheme_enqueue_login_style' );

	function theme_name_scripts() {
		wp_enqueue_style( 'style-name', get_stylesheet_uri() );
		wp_enqueue_style( 'theme-styles', get_template_directory_uri() . '/inc/css/main.min.css' );
		// wp_enqueue_script( 'script-name', get_template_directory_uri() . '/js/example.js', array(), '1.0.0', true );
	}

	function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
		return $twig;
	}

}

new StarterSite();

function myfoo( $text ) {
	$text .= ' bar!';
	return $text;
}

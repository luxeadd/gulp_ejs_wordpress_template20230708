<?php
/**
 * CSSとJavaScriptの読み込み
 *
 * @codex https://wpdocs.osdn.jp/%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC
 */

function my_script_init()
{
	wp_deregister_script('jquery');
	//フォント読み込み
	wp_enqueue_style('my-font1', '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');
	// jQueryの読み込み
	wp_enqueue_script('jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', "", "1.0.1");
	//swiper.css読み込み
	wp_enqueue_style('my-swiper-css', '//unpkg.com/swiper@8/swiper-bundle.min.css');
	//swiper.js読み込み
	wp_enqueue_script('my-swiper', '//unpkg.com/swiper@8/swiper-bundle.min.js');
	//css読み込み
	wp_enqueue_style('my-css', get_template_directory_uri() . '/assets/css/styles.css', array(), filemtime(get_stylesheet_directory() . '/assets/css/styles.css'), 'all');
	//js読み込み defer=true
	wp_enqueue_script('my-js', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0.1', true);
}
add_action('wp_enqueue_scripts', 'my_script_init');
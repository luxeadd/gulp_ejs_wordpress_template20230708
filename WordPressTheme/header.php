<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="format-detection" content="telephone=no">
  <title>タイトル</title>
  <!-- SEO系 -->
  <meta name="description" content="120文字以内！">
  <meta name="keywords" content="これは今はGoogleでは特に必要ないと言われてますがキーワードお願いされることも多々ある" />
  <!-- OGP -->
  <meta property="og:title" content="このページのタイトル/ページごとのタイトルにするお">
  <meta property="og:site_name" content="サイト名">
  <meta property="og:description" content="90文字くらい推奨">
  <meta property="og:type" content="TOPページはwebsite、子ページはarticle">
  <meta property="og:url" content="このページのURL">
  <meta property="og:image" content="1200×630以上推奨、絶対パス!!">
  <meta name="twitter:card" content="summary or summary_large_image">
  <meta name="twitter:site" content="@ユーザー名">
  <meta name="format-detection" content="telephone=no">
  <!-- タッチアイコン -->
  <link rel="apple-touch-icon" sizes="192x192" href="">
  <link rel="shortcut icon" sizes="192x192" href="">
  <!-- ファビコン -->
  <link rel="icon" href="" />
  <!-- クローラー -->
  <meta name="robots" content="noindex">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <!-- ページリンク -->
  <?php
  $home = esc_url(home_url("/"));
  $about = esc_url(home_url("/about/"));
  $works = esc_url(home_url("/works/"));
  $culture = esc_url(home_url("/culture/"));
  $topics = esc_url(home_url("/topics/"));
  $contact = esc_url(home_url("/contact/"));
  ?>

  <header class="l-header p-header js-header">
    <div class="p-header__inner">

      <!-- ヘッダーロゴ -->
      <?php if (is_front_page()) : ?>
        <h1 class="p-header__logo">
          <a href="<?php echo $home ?>">
            <img class="logo" src="" alt="タイトルロゴ">
          </a>
        </h1><!-- /.header__logo -->
      <?php else : ?>
        <div class="p-header__logo">
          <a href="<?php echo $home ?>">
            <img class="logo" src="" alt="タイトルロゴ">
          </a>
        </div><!-- /.header__logo -->
      <?php endif; ?>

      <!-- ドロワーアイコン  -->
      <button type="button" id="js-hamburger" class="p-header__drawer c-hamburger" aria-controls="js-drawer-menu" aria-expanded="false" area-label="メニューを開閉する">
        <span class="c-hamburger__line"></span>
      </button>

      <!-- ドロワーメニュー -->
      <div class=" p-header__drawer-menu  p-drawer-menu" id="js-drawer-menu" area-hidden="true">
        <ul class="p-drawer-menu__items">
          <li id="js-drawer-menu__item" class="p-drawer-menu__item  "><a href="<?php echo $about ?>">リスト</a></li>
          <li id="js-drawer-menu__item" class="p-drawer-menu__item"><a href="<?php echo $about ?>">リスト</a></li>
          <li id="js-drawer-menu__item" class="p-drawer-menu__item"><a href="<?php echo $about ?>">リスト</a></li>
          <li id="js-drawer-menu__item" class="p-drawer-menu__item"><a href="<?php echo $about ?>">リスト</a></li>
        </ul>
      </div><!-- /.p-header-menu -->

      <!-- pcーメニュー -->
      <nav class="p-header__pc-menu p-header-menu ">
        <ul class="p-header-menu__items">
          <li class="p-header-menu__item"><a href="<?php echo $about ?>">お知らせ</a></li><!-- /.pc-menu__item -->
          <li class="p-header-menu__item"><a href="<?php echo $about ?>">事業内容</a></li><!-- /.pc-menu__item -->
          <li class="p-header-menu__item"><a href="<?php echo $about ?>">制作実績</a></li><!-- /.pc-menu__item -->
          <li class="p-header-menu__item"><a href="<?php echo $about ?>">企業概要</a></li><!-- /.pc-menu__item -->
          <li class="p-header-menu__item"><a href="<?php echo $about ?>">ブログ</a></li><!-- /.pc-menu__item -->
        </ul><!-- /.pc-menu__items -->
      </nav><!-- /.header__menu -->

      <!-- ドロワーメニュー展開時背景 -->
      <div class="p-header__overlay" id="js-header__overlay"></div>

    </div><!-- /.header__inner -->
  </header>
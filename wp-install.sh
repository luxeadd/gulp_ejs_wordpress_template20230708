#!/bin/bash

# WordPressセットアップ admin_user,admin_passwordは管理画面のログインID,PW
## urlはdocker-compose.ymlで設定したWordPressのポート番号を指定
wp core install \
--url='http://localhost:9090' \
--title='テスト' \
--admin_user='test' \
--admin_password='test' \
--admin_email='luxeadd@gmail.com' \
--allow-root

# 日本語化
wp language core install ja --activate --allow-root

# タイムゾーンと日時表記
wp option update timezone_string 'Asia/Tokyo' --allow-root
wp option update date_format 'Y-m-d' --allow-root
wp option update time_format 'H:i' --allow-root

# キャッチフレーズの設定 (空にする)
wp option update blogdescription '' --allow-root

# プラグインの削除 (不要な初期プラグインを削除)
wp plugin delete hello.php --allow-root
wp plugin delete akismet --allow-root

# プラグインのインストール (必要に応じてコメントアウトを外す)
wp plugin install wp-multibyte-patch --activate --allow-root
# wp plugin install backwpup --activate --allow-root
# wp plugin install siteguard --activate --allow-root
# wp plugin install contact-form-7 --activate --allow-root
# wp plugin install wp-mail-smtp --activate --allow-root
# wp plugin install all-in-one-seo-pack --activate --allow-root
# wp plugin install broken-link-checker --activate --allow-root
# wp plugin install addquicktag --activate --allow-root

# テーマの削除
# wp theme delete twentysixteen --allow-root
# wp theme delete twentyseventeen --allow-root
# wp theme delete twentynineteen --allow-root
# wp theme delete twentyfour --allow-root
# wp theme delete twentythree --allow-root
# wp theme delete twentytwenty --allow-root

# パーマリンク更新
wp option update permalink_structure /%post_id%/ --allow-root

# 初期投稿・固定ページの削除と固定ページトップページを作成しホームページに設定
wp post delete 1 2 3  --force --allow-root
wp option update show_on_front 'page' --allow-root && wp option update page_on_front $(wp post create --post_type=page --post_status=publish --post_title='トップページ' --post_name='top' --porcelain --allow-root) --allow-root

# 翻訳の更新
wp core language update --allow-root

# パーミッションの変更
chown -R www-data:www-data /var/www/html/wp-content
chmod -R 755 /var/www/html/wp-content

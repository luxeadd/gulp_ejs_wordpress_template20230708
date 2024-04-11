## ファイルの特徴
- EJS兼WordPress用コーディングファイル
- src内の情報は静的ページ（dist）に反映される


## ファイル構成  
∟ dist ・・・本番用  
　∟ assets  
　　∟ css  
　　∟ images  
　　∟ js  
　∟ index.html

∟ src ・・・開発用  
　∟ ejs  
　∟ images  
　∟ js  
　∟ sass  
　　∟ base ・・・リセット系    
　　∟ utility ・・・共通SCSS  
　　∟ object ・・・FLOCSS対応  
　　∟ style.css ・・・インクルード用CSS  

∟ WordPressTheme ・・・WordPress関係ファイル（使用する場合はgulpfile.jsをWordPress用に編集すること） 

∟ _gulp ・・・gulpファイル格納用 


## このコーディングファイルの使い方
まず、以下に書いてある内容を必ずお読みください
この中身で分かることは以下のとおりです

- 使用環境
- 使い方および操作方法
- 注意点
## 使用環境
- Node.js バージョン14系以上
- npm バージョン8以上
- バージョン確認方法：※ターミナル上でコマンドを入力すること
  - `node -v`
  - `npm -v`
- コマンドを入力後、数字がでてくれば大丈夫です
## 使い方および操作方法
1. ターミナルを開く
2. `cd _gulp`をターミナルに入力（cdと_gulpの間には半角スペース要）
3. `npm i`をターミナルへ入力
4. ダウンロードが始まります
5. npx gulpでタスクランナーが起動します
### - npm i コマンドでダウンロードが始まる仕組み
- `package.json`ファイルから情報を参照して必要なパッケージをダウンロードします
- Gulpを動かすのに必要な情報になりますので削除は厳禁

### - Gulpの使い方
- `npx gulp` ないしは `gulp` でタスクランナー起動
  - コーディング中はずっと動かしたままにすること
- 提出時は `npx gulp build`ないしは`gulp build` コマンドでフォルダ内の整理を行うこと 
- ejsとWordPress時のGulpの挙動を条件分岐させています。作業開始前に必ずgulpfile.jsの[初期設定]を確認・変更してください。 
- WordPressの場合はコンパイルされたファイルは本ディレクトリ内ではなく、gulpfile.jsの[初期設定]にて設定したWordPress指定ディレクトリへ出力されます。
```
//---------------------------------------------------------------------
//      初期設定
// --------------------------------------------------------------------
// コンパイル設定 ejsを使う場合は[ejs]、WordPressを使う場合は[wp]を指定
const compilingSet = "ejs";
// WordPressの場合ローカル環境のプロジェクト名とテーマ名を指定
const wpProject = "gulp-test";
const wpThemeName = "test"; //style.cssのテーマ名も変更すること
const wpLocalUrl = "http://gulp-test.local/"; //ローカル環境のURL
//出力先のWordPressテーマのフォルダパス
const wpFolder =
  process.env.BASE_FOLDER ||
  `/Users/[ユーザー名]/Local Sites/${wpProject}/app/public/wp-content/themes/${wpThemeName}`;
// -----------------------------------------------------------------------
```

## コーディング時の操作方法
- `srcフォルダ`内のみを触る
- `srcフォルダ`内に入力した情報は自動的に`distフォルダ`に反映されます
- `distフォルダ`はアップロードするファイルなので編集は厳禁

## ファイルの特徴
- スマホファーストおよびパソコンファーストどちらも設定が可能`（変数管理）`
  - src/sass/global/_breakpoints.scssにある変数を`pc` or `sp`に設定する（初期値：`sp`）
  - スマホファーストとパソコンファーストを変数一つで切り替えが可能になっています
  
## 注意点
- `baseフォルダ内`は変更を加えないこと
- 納品時（提出時）は`_gulpフォルダ`内の`node_modules`を削除すること
- 提出時は`gulp build`コマンドを入力し、フォルダ内の整理を行うこと 
## 画像出力について

- 画像効率化の観点よりテンプレートを組んでいますので、以下の様式を使用してください。 （レスポンシブ、webp 対応）

EJS

```
<%- include(baseMeta.path +'common/_picture',
  {
    baseMeta:baseMeta,
    img:'common/image1',
    file:'.jpg',
    sp:'-sp',
    alt:'ダミー画像',
    async:'true',
    lazy:'true',
  }
) %>
```

WordPress

```
<?php
    $args = [
      'pictureImg' => 'common/image',
      'spImg' => 'true',
      'spImgName' => '',
      'alt' => '',
      'file' => '.jpg',
      'webp' => 'true',
      'pcWidth' => '850',
      'pcHeight' => '567',
      'spWidth' => '390',
      'spHeight' => '260',
      'async' => 'true',
      'lazy' => 'true',
    ];
    get_template_part('tmp/picture', null, $args);
?>
```
# gulp_ejs_wordpress_template20230708

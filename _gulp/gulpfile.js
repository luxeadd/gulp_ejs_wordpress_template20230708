const { src, dest, watch, series, parallel } = require("gulp"); // Gulpの基本関数をインポート
const sass = require("gulp-sass")(require("sass")); // SCSSをCSSにコンパイルするためのモジュール
const plumber = require("gulp-plumber"); // エラーが発生してもタスクを続行するためのモジュール
const notify = require("gulp-notify"); // エラーやタスク完了の通知を表示するためのモジュール
const sassGlob = require("gulp-sass-glob-use-forward"); // SCSSのインポートを簡略化するためのモジュール
const mmq = require("gulp-merge-media-queries"); // メディアクエリをマージするためのモジュール
const postcss = require("gulp-postcss"); // CSSの変換処理を行うためのモジュール
const autoprefixer = require("autoprefixer"); // ベンダープレフィックスを自動的に追加するためのモジュール
const cssdeclsort = require("css-declaration-sorter"); // CSSの宣言をソートするためのモジュール
const postcssPresetEnv = require("postcss-preset-env"); // 最新のCSS構文を使用可能にするためのモジュール
const sourcemaps = require("gulp-sourcemaps"); // ソースマップを作成するためのモジュール
const babel = require("gulp-babel"); // ES6+のJavaScriptをES5に変換するためのモジュール
const imageminSvgo = require("imagemin-svgo"); // SVGを最適化するためのモジュール
const browserSync = require("browser-sync"); // ブラウザの自動リロード機能を提供するためのモジュール
const imagemin = require("gulp-imagemin"); // 画像を最適化するためのモジュール
const imageminMozjpeg = require("imagemin-mozjpeg"); // JPEGを最適化するためのモジュール
const imageminPngquant = require("imagemin-pngquant"); // PNGを最適化するためのモジュール
const changed = require("gulp-changed"); // 変更されたファイルのみを対象にするためのモジュール
const del = require("del"); // ファイルやディレクトリを削除するためのモジュール
const webp = require("gulp-webp"); //webp変換
const rename = require("gulp-rename"); //ファイル名変更
const replace = require("gulp-replace"); // 文字列や正規表現による置換

// 読み込み先
const srcPath = {
  css: "../src/sass/**/*.scss",
  js: "../src/js/**/*",
  img: "../src/images/**/*",
  ejs: "../src/ejs/**/*.ejs",
  // html: ["../src/**/*.html", "!./node_modules/**"],
};

// html反映用
const destPath = {
  all: "../dist/**/*",
  css: "../dist/assets/css/",
  js: "../dist/assets/js/",
  img: "../dist/assets/images/",
  ejs: "../dist/",
};

// WordPress反映用
// const themeName = "WordPressTheme"; // WordPress theme name
// const destWpPath = {
// 	css: `../${themeName}/assets/css/`,
// 	js: `../${themeName}/assets/js/`,
// 	img: `../${themeName}/assets/images/`,
// }

const browsers = [
  "last 2 versions",
  "> 5%",
  "ie = 11",
  "not ie <= 10",
  "ios >= 8",
  "and_chr >= 5",
  "Android >= 5",
];

// HTMLファイルのコピー
// const htmlCopy = () => {
//   return src(srcPath.html).pipe(dest(destPath.html));
// };

const cssSass = () => {
  // ソースファイルを指定
  return (
    src(srcPath.css)
      // ソースマップを初期化
      .pipe(sourcemaps.init())
      // エラーハンドリングを設定
      .pipe(
        plumber({
          errorHandler: notify.onError("Error:<%= error.message %>"),
        })
      )
      // Sassのパーシャル（_ファイル）を自動的にインポート
      .pipe(sassGlob())
      // SassをCSSにコンパイル
      .pipe(
        sass.sync({
          includePaths: ["src/sass"],
          outputStyle: "expanded", // コンパイル後のCSSの書式（expanded or compressed）
        })
      )
      // ベンダープレフィックスを自動付与
      .pipe(
        postcss([
          postcssPresetEnv(),
          autoprefixer({
            grid: true,
          }),
        ])
      )
      // CSSプロパティをアルファベット順にソートし、未来のCSS構文を使用可能に
      .pipe(
        postcss([
          cssdeclsort({
            order: "alphabetical",
          }),
        ]),
        postcssPresetEnv({ browsers: "last 2 versions" })
      )
      // メディアクエリを統合
      .pipe(mmq())
      // ソースマップを書き出し
      .pipe(sourcemaps.write("./"))
      // html用 コンパイル済みのCSSファイルを出力先に保存
      .pipe(dest(destPath.css))
      // WordPress用 コンパイル済みのCSSファイルを出力先に保存
      // .pipe(dest(destWpPath.css))
      // Sassコンパイルが完了したことを通知
      .pipe(
        notify({
          message: "Sassをコンパイルしました！",
          onLast: true,
        })
      )
  );
};

// 画像圧縮
const imgImagemin = () => {
  // 画像ファイルを指定
  return (
    src(srcPath.img)
      // html用　変更があった画像のみ処理対象に
      .pipe(changed(destPath.img))
      // WordPress用　変更があった画像のみ処理対象に
      // .pipe(changed(destWpPath.img))
      // 画像を圧縮
      .pipe(
        imagemin(
          [
            // JPEG画像の圧縮設定
            imageminMozjpeg({
              quality: 80, // 圧縮品質（0〜100）
            }),
            // PNG画像の圧縮設定
            imageminPngquant(),
            // SVG画像の圧縮設定
            imageminSvgo({
              plugins: [
                {
                  removeViewbox: false, // viewBox属性を削除しない
                },
              ],
            }),
          ],
          {
            verbose: true, // 圧縮情報を表示
          }
        )
      )
      // 以下HTML用（WordPressの場合にはコメントアウト）
      .pipe(dest(destPath.img))
      .pipe(webp())
      .pipe(dest(destPath.img))
    // 以下WordPress用
    // .pipe(dest(destWpPath.img))
    // .pipe(webp())
    // .pipe(dest(destWpPath.img))
  );
};

// js圧縮
const jsBabel = () => {
  // JavaScriptファイルを指定
  return (
    src(srcPath.js)
      // エラーハンドリングを設定
      .pipe(
        plumber({
          errorHandler: notify.onError("Error: <%= error.message %>"),
        })
      )
      // Babelでトランスパイル（ES6からES5へ変換）
      .pipe(
        babel({
          presets: ["@babel/preset-env"],
        })
      )
      // 圧縮済みのファイルを出力先に保存
      .pipe(dest(destPath.js))
      // WordPress用
      // .pipe(dest(destWpPath.js))
  );
};

//  EJS
const ejs = require("gulp-ejs");
const htmlbeautify = require("gulp-html-beautify");

const srcEjsDir = "../src/ejs";

const ejsCompile = (done) => {
  src([srcEjsDir + "/*.ejs", "!" + srcEjsDir + "/_*.ejs"])
    .pipe(
      plumber({
        errorHandler: notify.onError(function (error) {
          return {
            message: "Error: <%= error.message %>",
            sound: false,
          };
        }),
      })
    )
    .pipe(ejs({}))
    .pipe(rename({ extname: ".html" }))
    .pipe(replace(/^[ \t]*\n/gim, ""))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 0,
        preserve_newlines: false,
        extra_liners: [],
      })
    )
    .pipe(dest(destPath.ejs));
  done();
};

// ブラウザーシンク
const browserSyncOption = {
  notify: false,
  server: "../dist/",
};
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

// ファイルの削除
const clean = () => {
  return del(destPath.all, { force: true });
};
// ファイルの監視
// HTML用（WordPressの場合にはコメントアウト）
const watchFiles = () => {
  watch(srcPath.css, series(cssSass, browserSyncReload));
  watch(srcPath.js, series(jsBabel, browserSyncReload));
  watch(srcPath.img, series(imgImagemin, browserSyncReload));
  watch(srcPath.ejs, series(ejsCompile, browserSyncReload));
};
// WordPress用
// const watchFiles = () => {
//   watch(srcPath.css, series(cssSass));
//   watch(srcPath.js, series(jsBabel));
//   watch(srcPath.img, series(imgImagemin));
// };

// ブラウザシンク付きの開発用タスク
// HTML用
exports.default = series(
  series(cssSass, jsBabel, imgImagemin, ejsCompile),
  parallel(watchFiles, browserSyncFunc)
);
// WordPress用
// exports.default = series(series(cssSass, jsBabel, imgImagemin), parallel(watchFiles));

// 本番用タスク
// HTML用
exports.build = series(clean, cssSass, jsBabel, imgImagemin, ejsCompile);
// WordPress用
// exports.build = series(clean, cssSass, jsBabel, imgImagemin);
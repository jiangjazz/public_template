const {
  series,
  parallel,
  src,
  dest,
  watch
} = require('gulp')
const $ = require("gulp-load-plugins")() //引入gulp-load-plugins
const config = require('./config/index')
$.autoprefixer = require('gulp-autoprefixer');
$.imagemin = require('gulp-imagemin');
console.log($, 9999)

// 第三方库资源
const libTask = function () {
  return src(`${config.src}/lib/**/*`) //合并的文件
    // .pipe($.concat('index.js')) //执行合并
    .pipe(dest(`${config.dist}/lib`)) //输出文件
}

// js
const jsTask = function () {
  return src(`${config.src}/assets/js/**/*.js`) //压缩的文件
    // .pipe($.uglify()) //执行压缩
    .pipe(dest(`${config.dist}/js`)) //输出文件
}

// css
const cssTask = function () {
  return src(`${config.src}/assets/css/**/*.css`) //编译的文件
    .pipe($.autoprefixer()) //执行编译
    // .pipe($.minifyCss()) //执行压缩
    .pipe(dest(`${config.dist}/css`)) //输出文件
}

// image (压缩图片)
const imageTask = function () {
  return src(`${config.src}/assets/images/**/*.{jpg,png,JPG,PNG}`) //优化的图片
    .pipe($.imagemin()) //执行优化
    .pipe(dest(`${config.dist}/images`)) //输出
}

// html
const htmlTask = function () {
  return src(`${config.src}/views/**/*.html`)
    .pipe(dest(`${config.dist}/`));
}

// 创建本地服务器
const serverTask = function () {
  return $.connect.server({
    root: config.dist, //服务器的根目录
    port: config.port, //服务器的地址，没有此配置项默认也是 8080
    livereload: true //启用实时刷新的功能
  });
}

// 刷新
const reloadTask = function () {
  return src(`${config.src}/views/**/*.html`) //指定源文件
    .pipe(dest(config.dist)) //拷贝到dist目录
    .pipe($.connect.reload()) //通知浏览器重启
}

// 监控文件改动
const watchTask = function(cb) {
  // lib
  watch(`${config.src}/lib/**/*`, series(libTask))
  // js
  watch(`${config.src}/assets/js/**/*.js`, series(jsTask))
  // css
  watch(`${config.src}/assets/css/**/*.css`, series(cssTask))
  // image
  watch(`${config.src}/assets/images/**/*.{jpg,png,JPG,PNG}`, series(imageTask))
  // html
  watch(`${config.src}/views/**/*.html`, series(htmlTask))

  cb()
}

// 清除目标文件夹：  gulp-clean
const cleanTask = function () {
  return src(config.dist) //清除的文件夹
    .pipe($.clean()) //执行清除
}

const defaultTask = series(libTask, imageTask, htmlTask);
exports.default = defaultTask;
exports.server = series(defaultTask, parallel(serverTask, reloadTask, watchTask))

// exports.build = series(cleanTask, libTask, imageTask, htmlTask);
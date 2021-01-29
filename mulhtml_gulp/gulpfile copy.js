const gulp = require("gulp"); //引入gulp模块
const $ = require("gulp-load-plugins")(); //引入gulp-load-plugins
const config = require('./config/index')


// 合并文件： gulp-concat
gulp.task('concat-js', function () {
  return gulp.src(`${config.src}/assets/js/!*.js`) //合并的文件
    // .pipe($.concat('index.js')) //执行合并
    .pipe(gulp.dest(`${config.dist}/js`)) //输出文件
})

// // 编译Sass： gulp-sass
// gulp.task('sass-css', function () {
//   return gulp.src(`${config.src}/sass/!*.sass`) //编译的文件
//     .pipe($.sass()) //执行编译
//     .pipe(gulp.dest(`${config.dist}/css`)) //输出文件
// })

// // 编译less： gulp-less
// gulp.task('less-css', function () {
//   return gulp.src(`${config.src}/less/!*.less`) //编译的文件
//     .pipe($.less()) //执行编译
//     .pipe(gulp.dest(`${config.dist}/css`)) //输出文件
// })

// 自动前缀： gulp-autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src(`${config.src}/assets/css/*.css`) //编译的文件
    .pipe($.autoprefixer()) //执行编译
    .pipe(gulp.dest(`${config.dist}/css`)) //输出文件
})

// 压缩图片： gulp-imagemin
gulp.task('imagemin', function () {
  return gulp.src(`${config.src}/assets/images/*.{jpg,png,JPG,PNG}`) //优化的图片
    .pipe($.imagemin()) //执行优化
    .pipe(gulp.dest(`${config.dist}/images`)) //输出
})

// 压缩html文件： gulp-minify-html
gulp.task('min-html', function () {
  return gulp.src(`${config.src}/views/*.html`) //压缩的文件
    // .pipe($.minifyHtml()) //执行压缩
    .pipe(gulp.dest(`${config.dist}/html`)) //输出文件
})

// 压缩css文件： gulp-minify-css
gulp.task('min-css', function () {
  return gulp.src(`${config.src}/assets/css/*.css`) //压缩的文件
    // .pipe($.minifyCss()) //执行压缩
    .pipe(gulp.dest(`${config.dist}/css`)) //输出文件
})

// 压缩js文件： gulp-uglify
gulp.task('min-js', function () {
  return gulp.src(`${config.src}/assets/js/*.js`) //压缩的文件
    // .pipe($.uglify()) //执行压缩
    .pipe(gulp.dest(`${config.dist}/js`)) //输出文件
})

// // 重命名js文件： gulp-rename
// gulp.task('rename-js', function () {
//   return gulp.src(`${config.src}/assets/js/*.js`) //重命名的文件
//     // .pipe($.rename('app.min.js')) //执行重命名及重命名名字
//     .pipe(gulp.dest(`${config.dist}/js`)) //输出文件
// })

// // es6转es5：  gulp-babel@7.0.1 babel-core babel-preset-es2015
// //导入的时候只要导入一个即可：
// const babel = require('gulp-babel')
// gulp.task('babel-js', function () {
//   return gulp.src(`${config.src}/js/**`) //转码的文件
//     .pipe(babel({
//       presets: ['es2015'] // 设置转码规则
//         // .pipe(uglify()) //执行转码
//         .pipe(gulp.dest(`${config.dist}/js`)) //输出文件
//     }))
// })

// 创建本地服务器： gulp-connect
gulp.task('server', function () {
  return $.connect.server({
    root: config.dist, //服务器的根目录
    port: config.port, //服务器的地址，没有此配置项默认也是 8080
    livereload: true //启用实时刷新的功能
  });
})

// 实时预览： gulp-connect
gulp.task('reload', function () {
  return gulp.src(`${config.src}/index.html`) //指定源文件
    .pipe(gulp.dest(config.dist)) //拷贝到dist目录
    .pipe($.connect.reload()) //通知浏览器重启
})

// // 代码检查： gulp-jshint
// gulp.task('jslint', function () {
//   return gulp.src(`${config.src}/!*.js`) //检查的文件
//     .pipe($.jshint()) //执行代码检查
//     .pipe($.jshint.reporter()) // 输出检查结果
// })

// 清除目标文件夹：  gulp-clean
gulp.task('clean', function () {
  return gulp.src(config.dist) //清除的文件夹
    .pipe($.clean()) //执行清除
})


// 
gulp.task('auto', function () {
  gulp.watch(`${config.src}/assets/!*.js`, ['concat-js']);
  // gulp.watch(`${config.src}/sass/!*.sass`, ['sass-css']);
  // gulp.watch(`${config.src}/less/!*.less`, ['less-css']);
  gulp.watch(`${config.src}/assets/css/*.css`, ['autoprefixer']);
  gulp.watch(`${config.src}/assets/images/*.{jpg,png,JPG,PNG}`, ['imagemin']);
  gulp.watch(`${config.src}/views/*.html`, ['min-html']);
  gulp.watch(`${config.src}/assets/css/*.css`, ['min-css']);
  gulp.watch(`${config.src}/assets/js/*.js`, ['min-js']);
  // gulp.watch('./src/js/**', ['babel-js']);
  gulp.watch(`${config.src}/assets/home.html`, ['reload']);
  // gulp.watch(`${config.src}/!*.js`, ['jslint']);
});


gulp.task('default', ['auto']); //设置auto为默认任务

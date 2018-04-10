var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

var jsFiles = [
    'src/js/c.js',
    'src/js/b.js',
    'src/js/a.js'
];//js之间按照规定的顺序

// jsFiles = 'src/js/*';//js之间按照字母大小的顺序,如需按照顺序注释掉这句

var jsOutputDir = 'dist/js';

var cssFiles = [
    'src/css/c.css',
    'src/css/b.css',
    'src/css/a.css'
];//css之间按照规定的顺序

// cssFiles = 'src/css/*';//css之间按照字母大小的顺序,如需按照顺序注释掉这句


var cssOutputDir = 'dist/css';

// 样式处理任务
gulp.task('css', function () {
    return gulp.src(cssFiles)    //引入所有CSS
        .pipe(concat('main.css'))           //合并CSS文件
        .pipe(gulp.dest(cssOutputDir))      //完整版输出
        .pipe(rename({suffix: '.min'}))   //重命名
        .pipe(csso())                  //CSS压缩
        .pipe(rev())
        .pipe(gulp.dest(cssOutputDir))      //压缩版输出
        .pipe(notify({message: 'css files have been processed'}));
});


// JS处理任务
gulp.task('script', function () {
    return gulp.src(jsFiles)      //引入所有需处理的JS
        .pipe(concat('main.js'))                  //合并JS文件
        .pipe(gulp.dest(jsOutputDir))        //完整版输出
        .pipe(rename({suffix: '.min'}))         //重命名
        .pipe(uglify())                           //压缩JS
        .pipe(rev())
        .pipe(gulp.dest(jsOutputDir))        //压缩版输出
        .pipe(notify({message: 'js files have been processed'}));
});

// 目标目录清理
gulp.task('clean', function () {
    return gulp.src(['dist/'], {read: false})
        .pipe(clean());
});


// 预设任务，执行清理后，
gulp.task('default', ['clean'], function () {
    gulp.start('css', 'script');
});
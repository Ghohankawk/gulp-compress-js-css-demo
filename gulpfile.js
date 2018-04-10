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
];//js֮�䰴�չ涨��˳��

// jsFiles = 'src/js/*';//js֮�䰴����ĸ��С��˳��,���谴��˳��ע�͵����

var jsOutputDir = 'dist/js';

var cssFiles = [
    'src/css/c.css',
    'src/css/b.css',
    'src/css/a.css'
];//css֮�䰴�չ涨��˳��

// cssFiles = 'src/css/*';//css֮�䰴����ĸ��С��˳��,���谴��˳��ע�͵����


var cssOutputDir = 'dist/css';

// ��ʽ��������
gulp.task('css', function () {
    return gulp.src(cssFiles)    //��������CSS
        .pipe(concat('main.css'))           //�ϲ�CSS�ļ�
        .pipe(gulp.dest(cssOutputDir))      //���������
        .pipe(rename({suffix: '.min'}))   //������
        .pipe(csso())                  //CSSѹ��
        .pipe(rev())
        .pipe(gulp.dest(cssOutputDir))      //ѹ�������
        .pipe(notify({message: 'css files have been processed'}));
});


// JS��������
gulp.task('script', function () {
    return gulp.src(jsFiles)      //���������账���JS
        .pipe(concat('main.js'))                  //�ϲ�JS�ļ�
        .pipe(gulp.dest(jsOutputDir))        //���������
        .pipe(rename({suffix: '.min'}))         //������
        .pipe(uglify())                           //ѹ��JS
        .pipe(rev())
        .pipe(gulp.dest(jsOutputDir))        //ѹ�������
        .pipe(notify({message: 'js files have been processed'}));
});

// Ŀ��Ŀ¼����
gulp.task('clean', function () {
    return gulp.src(['dist/'], {read: false})
        .pipe(clean());
});


// Ԥ������ִ�������
gulp.task('default', ['clean'], function () {
    gulp.start('css', 'script');
});
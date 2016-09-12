var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var del = require('del');

// Clean js folder
gulp.task('clean:build', function() {
    del('./public/js/*');
    del('./public/css/*');
})

//Copy
gulp.task('copy', function() {
    gulp.src('./assets/fonts/*').
    pipe(gulp.dest('./public/fonts/'));
})

// Min Js
gulp.task('minjs',['clean:build'], function() {
  	
  	gulp.src(['./assets/js/jquery.min.js','./assets/js/jquery.poptrox.min.js','./assets/js/skel.min.js','./assets/js/util.js','./assets/js/main.js'])
    .pipe(concat('bundle.js'))
    //.pipe(gulp.dest('./public/js/'))
	.pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./public/js/'));
	//IE8
    gulp.src('./assets/js/ie/html5shiv.js')
    .pipe(uglify())
    .pipe(rename({
				suffix: '.min'
			}))
    .pipe(gulp.dest('./public/js/'));
    //IE8
    gulp.src('./assets/js/ie/respond.min.js').
    pipe(gulp.dest('./public/js/'));
})

//sass to css
gulp.task('sass', function(){
		gulp
			.src(['./assets/sass/*.scss','./assets/sass/libs/*.scss'])
			.pipe(concat('main.css'))
			.pipe(sass())
			.pipe(cssnano())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('./public/css/'));

			
		gulp.src('./assets/css/ie8.css')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({
				suffix: '.min'
		}))
		.pipe(gulp.dest('./public/css/'));

		gulp.src('./assets/css/font-awesome.min.css')
    	.pipe(gulp.dest('./public/css/'));

    	gulp.src('./assets/css/images/*').
    	pipe(gulp.dest('./public/css/images/'));
})

// Build the application
.task('default', ['copy','minjs','sass'])
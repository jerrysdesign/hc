var gulp      = require('gulp'), 
		jade      = require('gulp-jade') ,
		less      = require('gulp-less') ,
		notify    = require('gulp-notify') ,
		bower     = require('gulp-bower'),
		webserver = require('gulp-webserver'),
		connect   = require('gulp-connect'),
		connectphp = require('gulp-connect-php');

var src = {};
var hidden_files = '**/_*.*';
var ignored_files = '!'+hidden_files;

// Sources config
var config = {
	resource	:	'./resources',
	jade			:	'./resources/jade',
	less			:	'./resources/less',
	vendor		:	'./bower_components' 
}


var source = {
	templates: {
		main	: [config.jade + '/index.jade'],
		file	: [config.jade + '/**/*.jade'],
		watch	: [config.jade + '/**/*.jade']
	},
	styles	: {
		main	: [config.less + '/style.less'],
		theme	: [config.less + '/theme.less'],
		file	: [config.less + '/**/*.less'],
		watch	: [config.less + '/**/*.less'],
		dir		: [config.less]
	},
	vendor	: {
		font:
		[
			config.vendor + '/open-sans-fontface/open-sans.css',
			config.vendor + '/open-sans-fontface/fonts/Light/*',
			config.vendor + '/open-sans-fontface/fonts/Regular/*',
			config.vendor + '/open-sans-fontface/fonts/Italic/*',
			config.vendor + '/open-sans-fontface/fonts/Semibold/*',
			config.vendor + '/fontawesome/css/font-awesome.min.css',
			config.vendor + '/fontawesome/fonts/*'
		],
		iconfont : [config.vendor + '/fontawesome/fonts/**.*']
	}
}

// Build target config 
var buide = {
	vendor		: './vendor' ,
	styles		: './css',
	templates	: '..',
	iconfont	: './fonts',
	font			: './fonts',
	derver		: '..'
}


//---------------
// TASKS
//---------------

gulp.task('icons', function() { 
	return gulp.src(source.vendor.iconfont) 
		.pipe(gulp.dest(buide.iconfont)); 
});

gulp.task('vendor', function() {
		gulp.src(source.vendor.font)
		.pipe( gulp.dest(buide.vendor) )
		;
});

gulp.task('styles', function() {
	return gulp.src(source.styles.main)
		.pipe(less({
			paths: [source.styles.dir]
		}))
		.pipe(gulp.dest(buide.styles))
		;
});

gulp.task('theme', function() {
	return gulp.src(source.styles.theme)
		.pipe(less({
			paths: [source.styles.dir]
		}))
		.pipe(gulp.dest(buide.styles))
		;
});

gulp.task('templates', function() {
	gulp.src(source.templates.file)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(buide.templates))
});

gulp.task('webserver', function() {
	gulp.src(buide.server)
		.pipe(webserver({
				host: 'localhost',
				port: '5000',
				livereload: true,
				directoryListing: false
		}));
});

gulp.task('connectphp', function() {
		connectphp.server();
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
	gulp.watch(config.styles.watch, ['styles', 'theme']); 
	gulp.watch(config.templates.watch, ['templates']); 
});

var tasks = [
	'icons',
	'vendor',
	'theme',
	'styles',
	'templates',
	'connectphp'
];

gulp.task('default', tasks);
var gulp      = require('gulp'), 
		jade      = require('gulp-jade') ,
		less      = require('gulp-less') ,
		notify    = require("gulp-notify") ,
		bower     = require('gulp-bower'),
		webserver = require('gulp-webserver'),
		connect   = require('gulp-connect');

// Sources config
var source = {
	resource : './resources',
	jadePath : './resources/jade',
	lessPath : './resources/less',
	bowerDir : './bower_components' 
}

var config = {
	templates: {
		main: [source.jadePath + '/index.jade'],
		file: [source.jadePath + '/**/*.jade'],
		watch: [source.jadePath + '/**/*.jade']
	},
	styles: {
		main: [source.lessPath + '/style.less'],
		file: [source.lessPath + '/**/*.less'],
		watch: [source.lessPath + '/**/*.less']
	},
	dest: {
		templates: './public',
		styles: './public/css'
	},
	server: './public'
}

var buide = {
	templates: config.templates.file,
	styles: config.styles.file
}

gulp.task('bower', function() { 
	return bower()
		.pipe(gulp.dest(source.bowerDir)) 
});

gulp.task('icons', function() { 
	return gulp.src(source.bowerDir + '/fontawesome/fonts/**.*') 
		.pipe(gulp.dest('./public/fonts')); 
});

gulp.task('templates', function() {
	gulp.src(config.templates.file)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(config.dest.templates))
});

gulp.task('css', function() { 
	return gulp.src(config.styles.main)
		.pipe(less({
			paths: [
				source.lessPath,
				source.bowerDir + '/bootstrap/less',
				source.bowerDir + '/fontawesome/less'
			]
		}) 
			.on("error", notify.onError(function (error) {
				 return "Error: " + error.message;
			}))) 
		.pipe(gulp.dest(config.dest.styles))
		.pipe(connect.reload()); 
});

gulp.task('webserver', function() {
	gulp.src(config.server)
		.pipe(webserver({
				host: 'localhost',
				port: '5000',
				livereload: true,
				directoryListing: false
		}));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
	gulp.watch(config.styles.watch, ['css']); 
	gulp.watch(config.templates.watch, ['templates']); 
});

var tasks = [
	'bower',
	'icons',
	'templates',
	'css',
	'webserver',
	'watch'
];

gulp.task('default', tasks);
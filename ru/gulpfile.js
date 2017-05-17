var gulp = require("gulp"),
	coffee = require("gulp-coffee"),
	connect = require("gulp-connect"),
	concat = require("gulp-concat"),
	stylus = require("gulp-stylus");

gulp.task("serve", function() {
	connect.server({
		livereload: true
	});
});

gulp.task("reload-page", function() {
	return gulp.src(['./*.html', './js/*.js'])
				.pipe(connect.reload());
});

gulp.task('reload-css', function() {
		return gulp.src('./styles/css/**/*.css')
					.pipe(connect.reload());
});

gulp.task('stylus', function() {
		return gulp.src('./styles/stylus/**/*.styl')
					.pipe(concat('main.styl'))
					.pipe(stylus())
					.pipe(gulp.dest('./styles/css/'));
});

gulp.task("coffee", function() {
	return gulp.src([
		'./coffee/speech/recognition/Recognee.coffee',
		'./coffee/ui/Passage.coffee',
		'./coffee/init/data.coffee',
		'./coffee/init/vocabulary.coffee',
		'./coffee/init/language.coffee',
		'./coffee/components/welcome.coffee',
		'./coffee/components/loading.coffee',
		'./coffee/components/player.coffee',
		'./coffee/components/upload.coffee',
		'./coffee/components/src.coffee',
		'./coffee/components/controls.coffee',
		'./coffee/init/app.coffee',
		'./coffee/interface/player.coffee',
		'./coffee/init/recognizer.coffee',
		'./coffee/**/!(app|Recognee|recognizer|loading|upload|src|player|welcome|data|player|controls|vocabulary|language).coffee'],
		{ sourcemaps: true })
	  .pipe(coffee({ bare: true }))
	  .pipe(concat("bundle.js"))
	  .pipe(gulp.dest('./js/'));
});

gulp.task("watch", function() {
	gulp.watch("./coffee/**/*.coffee", gulp.series("coffee","reload-page"));
	gulp.watch('./styles/stylus/**/*.styl', gulp.series('stylus', 'reload-css'));
	gulp.watch("./*.html", gulp.series("reload-page"));
});

gulp.task("default", function() {
	gulp.series("coffee", 'stylus', gulp.parallel("serve", "watch"))();
});

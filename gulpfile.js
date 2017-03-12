var gulp = require("gulp"),
	coffee = require("gulp-coffee"),
	connect = require("gulp-connect");

gulp.task("serve", function() {
	connect.server({
		livereload: true
	});
});

gulp.task("reload-page", function() {
	return gulp.src(['./*.html', './js/*.js'])
				.pipe(connect.reload());
});

gulp.task("coffee", function() {
	return gulp.src('./coffee/*.coffee', { sourcemaps: true })
	  .pipe(coffee({ bare: true }))
	  .pipe(gulp.dest('./js/'));
});

gulp.task("watch", function() {
	gulp.watch(["./*.html", "./js/*.js"], gulp.series("reload-page"));
});

gulp.task("default", function() {
	gulp.series("coffee", gulp.parallel("serve", "watch"))();
});

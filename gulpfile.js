const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Compile SCSS to CSS
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream()); // Inject changes without full page reload
});

// Initialize BrowserSync and watch for changes
gulp.task("serve", function () {
  browserSync.init({
    server: "./", // Serve from the project root directory
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("sass")); // Watch SCSS files
  gulp.watch("*.html").on("change", browserSync.reload); // Watch HTML files
});

// Default task to run everything
gulp.task("default", gulp.parallel("sass", "serve"));

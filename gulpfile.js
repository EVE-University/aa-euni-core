const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const rename = require("gulp-rename");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

const APP_NAME = "eunicore";
const STATIC_PATH = APP_NAME + "/static/" + APP_NAME;

const SASS_CONFIG = {
    includePaths: ["node_modules"],
};

gulp.task("styles", () => {
    return gulp
        .src(STATIC_PATH + "/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(SASS_CONFIG).on("error", sass.logError))
        .pipe(gulp.dest(STATIC_PATH + "/css/"))
        .pipe(postcss([cssnano()]))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(STATIC_PATH + "/css/"));
});

gulp.task("fonts", () => {
    return gulp
        .src("node_modules/bootstrap-sass/assets/fonts/**/*.*")
        .pipe(gulp.dest(STATIC_PATH + "/fonts/"));
});

gulp.task("clean", () => {
    return del([
        STATIC_PATH + "/css/*.*",
        STATIC_PATH + "/fonts/*.*",
        "!*/__pycache__/*",
    ]); // Ignore __pycache__ so builds don't error during pip -e installs
});

gulp.task(
    "default",
    gulp.series(["clean", gulp.parallel(["styles", "fonts"])])
);

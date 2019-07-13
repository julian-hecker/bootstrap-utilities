// Include Plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');

const paths = {
  scss: {
    src: 'src/scss/**/*.+(scss|sass)',
    dest: 'dist/css/'
  }
};

function clean() {
  return del([
    'dist/**/*'
  ])
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulpPostcss( [autoprefixer( {remove: false} )] ))
    .pipe(gulpRename("bootstrap-utilities.css"))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(gulpPostcss( [cssnano] ))
    .pipe(gulpRename("bootstrap-utilities.min.css"))
    .pipe(gulp.dest(paths.scss.dest));
}

exports.clean = clean;
exports.scss = scss;

exports.build = gulp.series(clean, scss);
exports.default = gulp.series(this.build);
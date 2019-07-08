// Include Plugins
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpSass = require('gulp-sass');

const paths = {
  css: {
    src: 'src/css/**/*.css',
    dest: 'dist/css/'
  },
  scss: {
    src: 'src/scss/**/*.+(scss|sass)',
    dest: 'src/css/'
  }
};

function clean() {
  return del([
    'dist/**/*'
  ])
}

function css() {
  return gulp.src(paths.css.src)
    .pipe(gulpPostcss( [autoprefixer( {remove: false} ), cssnano()] ))
    .pipe(gulp.dest(paths.css.dest));
}

function scss() {
  return gulp.src(paths.scss.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(paths.scss.dest));
}

exports.clean = clean;
exports.css = css;
exports.scss = scss;

exports.build = gulp.series(clean, scss, css);
exports.default = gulp.series(clean, scss, css);
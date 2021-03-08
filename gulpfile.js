let gulp = require('gulp');
let sass = require('gulp-sass');
let ts = require('gulp-typescript');
let webserver = require('gulp-webserver');

const buildPath = 'public';

gulp.task('styles', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(buildPath));
});

gulp.task('watch:styles', gulp.series('styles', function (done) {
  gulp.watch('src/**/*.scss', gulp.series('styles'));
  done();
}));

gulp.task('scripts', function () {
  let tsConfig = ts.createProject('tsconfig.json');
  return tsConfig.src()
    .pipe(tsConfig())
    .pipe(gulp.dest(buildPath + '/assets/scripts'));
});

gulp.task('watch:scripts', gulp.series('scripts', function (done) {
  gulp.watch('src/**/*.ts', gulp.series('scripts'));
  done();
}));


gulp.task('html', function () {
  return gulp.src('views/index.html')
    .pipe(gulp.dest(buildPath));
});

gulp.task('watch:html', gulp.series('html', function (done) {
  gulp.watch('views/**/*.html', gulp.series('html'));
  done();
}));

gulp.task('serve', function () {
  return gulp.src(buildPath)  //origen
    .pipe(webserver({
      open: true,
      liverload: true,
      port: 3000
    })) //destino
});

//gulp.task('default', gulp.parallel('watch:styles', 'watch:scripts', 'watch:html', 'serve'));
gulp.task('default', gulp.parallel('watch:styles', 'watch:scripts', 'watch:html'));

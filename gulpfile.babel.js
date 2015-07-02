'use strict';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import browserSync, {reload} from 'browser-sync';
import mainBowerFiles from 'main-bower-files';

const $ = gulpLoadPlugins();
const port = process.env.NODE_PORT || 3000;
const env = process.env.NODE_ENV || '';
const isProduction = env === 'production';

const src = {
  sass: 'public/styles/**/*.{scss,sass}',
  html: 'public/*.html'
};

const dest = {
  webpack: '.tmp/scripts',
  webpackProd:'build/scripts',
  sass: '.tmp/styles',
  sassProd: 'build/styles',
  bower: '.tmp/lib',
}

const callback = (done) => {
  return (err, stats) => {
    if(err) throw new $.util.PluginError("webpack", err);
    $.util.log("[webpack]", stats.toString({ chunkModules: false, colors: true}));
    done && done();
  }
}

gulp.task('webpack', (done) => {
  webpack(require('./webpack.config'))
  .run(callback(done));
});

gulp.task('watch-webpack', (done) => {
  webpack(require('./webpack.config')).watch(200, callback(reload));
  done();
});

gulp.task('sass', () => {
  let outputStyle = isProduction ? 'compressed' : 'nested';

  return gulp.src(src.sass)
    .pipe($.sass({ outputStyle: outputStyle, errorLogToConsole: true }))
    .pipe(gulp.dest(dest.sass))
    .pipe(reload({ stream: true }));
});

gulp.task('main-bower-files', () => {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest(dest.bower));
});

gulp.task('html', ['main-bower-files', 'webpack', 'sass'], () => {
  return gulp.src(src.html)
    .pipe($.usemin({
      css: ['concat'],
      js: ['concat']
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('serve', ['watch'], () => {
  browserSync({
    server: {
      baseDir: ['public', '.tmp']
    },
    files: [
      'public/*.html',
      '.tmp/lib/**/*',
      '.tmp/scripts/**/*.js',
      '.tmp/styles/**/*.css'
    ],
    port: port,
    ghostMode: false
  });
});

gulp.task('start', ['build'], () => {
  browserSync({
    server: {
      baseDir: ['build']
    },
    port: port,
    ghostMode: false
  });
});

gulp.task('default', ['main-bower-files', 'serve']);

gulp.task('watch', ['watch-webpack'], () => {
  gulp.watch([src.sass], ['sass']);
  gulp.watch(['bower.json'], ['main-bower-files']);
});

gulp.task('build', ['html']);

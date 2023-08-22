const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

const env = process.env.NODE_ENV;
task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
})
task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
})

task('styles', () => {
    return src([
        ...STYLES_LIBS, `${SRC_PATH}/css/main.scss`
    ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(px2rem({
            dpr: 1,             // base device pixel ratio (default: 2)
            rem: 16,            // root element (html) font-size (default: 16)
            one: false          // whether convert 1px to rem (default: false)
        }))
        .pipe(gulpif(env === 'dev', autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        )
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

const libs = [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/mobile-detect/mobile-detect.js",
    "node_modules/jquery-touchswipe/jquery.touchSwipe.js",
    "src/js/*.js"
]
task('scripts', () => {
    return src([
        ...JS_LIBS, `${SRC_PATH}/js/*.js`
    ])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', { newLine: ';' }))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});
const img = [
    'src/img/**/**',

]
task('icons', () => {
    return src(img)
        .pipe(dest(`${DIST_PATH}/img`));
})

task('server', function () {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});

task('watch', () => {
    watch(`./${SRC_PATH}/img`, series('icons'));
    watch(`./${SRC_PATH}/css/**/*.scss`, series('styles'));
    watch(`./${SRC_PATH}/*.html`, series('copy:html'));
    watch(`./${SRC_PATH}/js/*.js`, series('scripts'));
})

task('default', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons'), parallel('watch', 'server')));
task('build', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons')));
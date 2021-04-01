const { notify } = require("browser-sync");
const { watch, series, parallel, src, dest, lastRun } = require("gulp"),
    imageMin = require("gulp-imagemin");
var del = require('del'),
    njkRender = require("gulp-nunjucks-render"),
    postCss = require("gulp-postcss"),
    cleanCss = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    conCat = require("gulp-concat"),
    gulpIf = require("gulp-if"),
    browserSync = require("browser-sync").create();

// Defines the dev and prod directories
const paths = {
    dir: {
      dist: './dist/',
      build: './build/'
    }
  };

// Set build directory & vars according env. Default is dev
var buildDir = paths.dir.dist;
var buildEnv = "dev";
if (process.env.NODE_ENV === 'prod') {
    buildDir = paths.dir.build;
    buildEnv = "prod";
}

// Function to empty production || build-directory
function cleanDir(cb){
    return del([buildDir+"*"]);
    cb();
}

// Function for compiling the source html file by processhtml
function htmlComp(cb){
    return src("./src/html/pages/**/*.+(html|njk)")
        .pipe(njkRender({path: ['./src/html/templates/layouts/', './src/html/templates/partials/']}))
        .pipe(dest(buildDir))
        .pipe(browserSync.stream());
    cb();
}

// Function for compiling CSS files using PostCSS
function cssComp(cb) {
    return src("./src/css/*.css") // read .css files from ./src/ folder
        .pipe(postCss()) // compile using postcss
        .pipe(gulpIf(buildEnv === 'prod', cleanCss()))
        .pipe(conCat('main.min.css'))
        .pipe(dest(buildDir+"css/")) // paste them in ./assets/css folder
        .pipe(browserSync.stream());
    cb();
}

//Function for compiling javascript files using babel + uglify
function jsComp(cb){
    return src("./src/js/**/*.js")
        .pipe(gulpIf(buildEnv === 'prod', uglify()))
        .pipe(conCat('main.min.js'))
        .pipe(dest(buildDir+"js/"))
    cb();
}

// Function for minifying images
function imageminComp(cb) {
    return src("./src/images/*.+(png|jpg|gif|svg)",{since: lastRun(imageminComp)})
        .pipe(gulpIf(process.env.NODE_ENV === "prod", imageMin([
            imageMin.gifsicle({interlaced: true}),
            imageMin.mozjpeg({quality: 50, progressive: true}),
            imageMin.optipng({optimizationLevel: 5}),
            imageMin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(dest(buildDir+"images/"))
    cb();
}

// Copy the assets folder to dist
function assetsCopy(){
    return src("./src/assets/**/*")
        .pipe(dest(buildDir+"assets/"));
}

// Function to start live reload server
function browsersyncServe(cb) {
    browserSync.init({
        port: 8090,
        server: {
            baseDir: paths.dir.dist,
        },
        ui: {
            port:8091
        },
        notify: false
    });
    cb();
}

// Function to live reload
function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch task files & reload browser
function watchTask() {
    watch("./src/html/**/*.+(html|njk)", series(htmlComp, browsersyncReload));
    watch(["./src/css/**/*.css"], series(cssComp, browsersyncReload));
    watch(["./src/js/**/*.js"], series(jsComp, browsersyncReload));
    watch(["./src/images/**/*.+(png|jpg|gif|svg)"], series(imageminComp, browsersyncReload));
}

// Declare  gulp Tasks
exports.cleanDir = cleanDir;
exports.htmlComp = htmlComp;
exports.cssComp = cssComp;
exports.jsComp = jsComp;
exports.imagesComp = imageminComp;
exports.assetsCopy = assetsCopy;
exports.build = series(cleanDir, parallel(htmlComp, cssComp, jsComp, imageminComp, assetsCopy));
exports.default = series(htmlComp, cssComp, jsComp, imageminComp, assetsCopy, browsersyncServe, watchTask);

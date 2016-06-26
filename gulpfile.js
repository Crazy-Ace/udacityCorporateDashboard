var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge2'),
    inject = require('gulp-inject'),
    del = require('del'),
    SystemBuilder = require('systemjs-builder'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    es = require('event-stream'),

    files = {
        dist: './dist/',
        index: './dist/index.html',
        ts: './app/**/**.ts',
        tsConfig: 'tsconfig.json',
        system: 'system.config.js',
        vendorJs: [
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js'
        ],
        templates: 'app/**/**.html',
        buildOrder: [
            './dist/temp/shim.min.js',
            './dist/temp/zone.js',
            './dist/temp/Reflect.js',
            './dist/temp/system.src.js',
            './dist/temp/ts.js'
        ],
        stylus: {
            main: './assets/stylus/style.styl',
            all: './assets/stylus/**/**.styl',
        },
        vendorCss: [
            'node_modules/materialize-css/dist/css/materialize.min.css'
        ]
    };


/*
    Helper Tasks
 */
gulp.task('compile-ts', () => {
    var tsProject = ts.createProject(files.tsConfig),
        tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(files.dist + 'temp'))
});

// Move required files to dist
gulp.task('move-vendor-js', () => gulp.src(files.vendorJs).pipe(gulp.dest(files.dist + 'temp')));
gulp.task('move-vendor-css', () => gulp.src(files.vendorCss).pipe(gulp.dest(files.dist + 'devCss')));
gulp.task('move-templates', () => gulp.src(files.templates).pipe(rename({dirname: ''})).pipe(gulp.dest(files.dist + 'templates')));

gulp.task('system-build', ['compile-ts'], () => {
    var builder = new SystemBuilder();
    return builder.loadConfig(files.system)
        .then(() => builder.buildStatic('app', files.dist + 'temp/ts.js'))
});

gulp.task('concat', ['system-build', 'move-vendor-js'], () => {
    return gulp.src(files.buildOrder)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(files.dist));
});

gulp.task('minify', ['concat'], () => {
    return gulp.src(files.dist + 'bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest(files.dist))
});

gulp.task('clean-extra', ['minify'], () => del(files.dist + 'temp'));

gulp.task('clear-all', () => del([files.dist + 'temp', files.dist + '**/**.js', files.dist + 'devCss', files.dist + 'templates']));

gulp.task('compile-stylus', () => {
    return gulp.src(files.stylus.main)
        .pipe(stylus())
        .pipe(gulp.dest(files.dist + 'devCss'));
});


/*
    Production Build
 */
gulp.task('prod-build', ['clear-all', 'clean-extra'], () => {
    var target = gulp.src(files.index);
        js = gulp.src(files.dist + '**.js');

    return target
        .pipe(inject(js, {relative: true}))
        .pipe(gulp.dest(files.dist));
});

/*
    Development Build
 */
gulp.task('dev-build', ['clear-all', 'system-build', 'move-vendor-js', 'move-vendor-css', 'compile-stylus', 'move-templates'], () => {
    var target = gulp.src(files.index),
        js = gulp.src(files.buildOrder, {read: false}),
        css = gulp.src(files.dist + 'devCss/**.css');

    return target
        .pipe(inject(es.merge(js, css), {relative: true}))
        .pipe(gulp.dest(files.dist));
});


gulp.task('watch-app', () => {
    gulp.watch(files.ts, ['system-build'], () => {
        var target = gulp.src(files.index);
        js = gulp.src(files.buildOrder);

        return target
            .pipe(inject(js, {relative: true}))
            .pipe(gulp.dest(files.dist));
    });

    gulp.watch(files.stylus.all, ['compile-stylus']);
    gulp.watch(files.templates, ['move-templates'])
});
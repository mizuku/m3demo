"use strict";
let gulp = require("gulp");
let del = require("del");
let exec = require("child_process").exec;
let plumber = require("gulp-plumber");
let concat = require("gulp-concat");
let rename = require("gulp-rename");
let source = require("vinyl-source-stream");
let sourcemaps = require("gulp-sourcemaps");

let tsc = require("typescript");
let typescript = require("gulp-typescript");
var sass = require("gulp-sass");

let webpack = require("webpack-stream");

let approot = "app";
let jsdest = ".jsdest";
let pub = "public"
let path = {
    approot: approot,
    scssroot: `${approot}/styles`,
    config: "config",
    jsdest: jsdest,
    public: pub,
    jspub: `${pub}/scripts`
};

/* clean */
function _clean() {
    return del([
        `${path.public}/**/*`
    ]);
}
gulp.task("clean", _clean);

/* ts compile => js outputs tmp directory */
gulp.task("ts:compile", () => {
    /* read tsconfig.json */
    let project = typescript.createProject("./tsconfig.json", { typescript: tsc })
    gulp.src([
        `${path.approot}/**/*.{ts,tsx}`
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(typescript(project))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.jsdest))
    ;
})

/* bundle(This task ts compile and js bundle) */
gulp.task("bundle:dev", () => {
    let config = require("./webpack.config.js");
    return gulp.src([
        `${path.approot}/index.ts`
    ])
        .pipe(webpack(config))
        .pipe(gulp.dest(`${path.jspub}`))
    ;
});

gulp.task("bundle:pro", () => {
    let config = require("./webpack-production.config.js");
    return gulp.src([
        `${path.approot}/index.ts`
    ])
        .pipe(webpack(config))
        .pipe(gulp.dest(`${path.jspub}`))
    ;
});

/* scss */
gulp.task("scss:compile", () => {
    return gulp.src([
        `${path.scssroot}/styles.scss`
    ], { base: path.scssroot })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat("styles.scss"))
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.public))
        ;
});

/* html */
gulp.task("html:dest", () => {
    return gulp.src([
        `${path.approot}/**/*.html`
    ], { base: path.approot })
        .pipe(gulp.dest(path.public))
    ;
})

/* image */
gulp.task("image:dest", () => {
    return gulp.src([
        `${path.approot}/images/*`
    ], { base: path.approot })
        .pipe(gulp.dest(path.public))
    ;
})

/* config */
gulp.task("config:copy", () => {
    return gulp.src([
        `${path.config}/**/*`
    ]).pipe(gulp.dest(path.public))
    ;
})

/* watch */
/* ts watch */
gulp.task("ts:watch", () => {
    gulp.watch(`${path.approot}/**/*.{ts,tsx}`, ["ts:compile"]);
});
/* scss watch */
gulp.task("scss:watch", () => {
    gulp.watch(`${path.scssroot}/**/*.scss`, ["scss:compile"]);
});
/* html watch */
gulp.task("html:watch", () => {
    gulp.watch(`${path.approot}/**/*.html`, ["html:dest"]);
});
/* config watch */
gulp.task("config:watch", () => {
    gulp.watch(`${path.config}/**/*`, ["config:copy"]);
});
/* all watch */
gulp.task("watch", ["ts:watch", "scss:watch", "html:watch", "config:watch"]);


/* development build */
gulp.task("build:dev", ["bundle:dev", "scss:compile", "html:dest", "image:dest", "config:copy"]);
gulp.task("rebuild:dev", ["clean"], () => {
    gulp.run("build:dev");
});

/* production build */
gulp.task("build:pro", ["bundle:pro", "scss:compile", "html:dest", "image:dest", "config:copy"]);
gulp.task("rebuild:pro", ["clean"], () => {
    gulp.run("build:pro");
});

/* default tasks */
gulp.task("default", ["build:dev"]);

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
    extlib: ".extlib",
    jsdest: jsdest,
    public: pub,
    jspub: `${pub}/scripts`
};

/* clean */
function _clean() {
    return del([
        `${path.public}/**/*`,
        `${path.extlib}/**/*`
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

/* copy from node_modules to extlib */
gulp.task("extlib", () => {
    return gulp.src([
        "node_modules/mdl-select-component/mdl-selectfield.min.js",
        "node_modules/mdl-select-component/mdl-selectfield.min.css",
    ])
        .pipe(gulp.dest(path.extlib))
    ;
});

/* bundle(This task ts compile and js bundle) */
gulp.task("bundle:dev", ["extlib"], () => {
    let config = require("./webpack.config.js");
    return gulp.src([
        `${path.approot}/index.ts`
    ])
        .pipe(webpack(config))
        .pipe(gulp.dest(path.jspub))
    ;
});

gulp.task("bundle:pro", ["extlib"], () => {
    let config = require("./webpack-production.config.js");
    return gulp.src([
        `${path.approot}/index.ts`
    ])
        .pipe(webpack(config))
        .pipe(gulp.dest(path.jspub))
    ;
});

/* scss */
gulp.task("scss:dev", () => {
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
gulp.task("scss:pro", () => {
    return gulp.src([
        `${path.scssroot}/styles.scss`
    ], { base: path.scssroot })
        .pipe(plumber())
        .pipe(concat("styles.scss"))
        .pipe(sass({ outputStyle: "compressed" }))
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

/* csslib */
gulp.task("csslib:copy", ["extlib"], () => {
    return gulp.src([
        `${path.extlib}/**/*.css`
    ])
        .pipe(gulp.dest(path.public))
    ;
})

/* watch */
/* ts watch */
gulp.task("ts:watch", () => {
    gulp.watch(`${path.approot}/**/*.{ts,tsx}`, ["ts:compile"]);
});
/* scss watch */
gulp.task("scss:watch", () => {
    gulp.watch(`${path.scssroot}/**/*.scss`, ["scss:dev"]);
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
gulp.task("build:dev",
    ["bundle:dev", "scss:dev", "html:dest", "image:dest",
     "config:copy", "csslib:copy"]);
gulp.task("rebuild:dev", ["clean"], () => {
    gulp.run("build:dev");
});

/* production build */
gulp.task("build:pro",
    ["bundle:pro", "scss:pro", "html:dest", "image:dest",
     "config:copy", "csslib:copy"]);
gulp.task("rebuild:pro", ["clean"], () => {
    gulp.run("build:pro");
});

/* default tasks */
gulp.task("default", ["build:dev"]);

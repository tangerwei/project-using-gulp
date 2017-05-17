const gulp = require('gulp');
const spriter = require("gulp-spriter");
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
// gulp.task("css",function(){
//   return gulp.src("./src/css/style.css")
//          .pipe(spriter({
//             sprite:"test.png",
//             slice:"./src/slice",
//             outpath:"./build/tests"
//           }))
//          .pipe(gulp.dest('./build/css'));
// })

// gulp.task('platformCss',function(){
//   gulp.src("./test/style/platform.css")
//   .pipe(spriter({
//     sprite:'platformSprite.png',
//     slice:'./test/images',
//     outpath:'./build/images'
//   }))
//   .pipe(gulp.dest('./build/style'));
// });

gulp.task('platformCss', function () {
  gulp.src("./demo/style/style.css")
    .pipe(spriter({
      sprite: 'style.png',
      slice: './demo/images',
      outpath: './build/images'
    }))
    .pipe(gulp.dest('./build/style'));
});

gulp.task('sass', function () {
  return gulp.src('./demo/sass/orderManage.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./test/style'));
});

gulp.task('websass', function () {
  return gulp.src('./webSite/use.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./webSite/css'));
});

const babel = require('gulp-babel');
gulp.task('jsx', function () {
  return gulp.src('code/jsx/*.jsx')
    .pipe(babel({
      presets: ["env", "es2015", "react"]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('buildcode_edit', function () {
  gulp.src('code/jsx/*.jsx')
    .pipe(babel({
      presets: ["env", "es2015", "react"]
    }))
    .pipe(gulp.dest('./code/dist'));
  gulp.src('./code/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./code/css'));
})

gulp.task('buildcode', function () {
  gulp.src('code/jsx/*.jsx')
    .pipe(babel({
      presets: ["env", "es2015", "react"]
    }))
    .pipe(gulp.dest('./code/dist'));
  gulp.src('./code/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./code/css'));
})
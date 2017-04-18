const gulp = require('gulp'); 
const spriter = require("gulp-spriter");
const sass = require('gulp-sass');
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

gulp.task('platformCss',function(){
  gulp.src("./demo/style/style.css")
  .pipe(spriter({
    sprite:'style.png',
    slice:'./demo/images',
    outpath:'./build/images'
  }))
  .pipe(gulp.dest('./build/style'));
});

gulp.task('sass',function(){
  return gulp.src('./demo/sass/*.scss')
  .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
  .pipe(gulp.dest('./build/sass'));
});
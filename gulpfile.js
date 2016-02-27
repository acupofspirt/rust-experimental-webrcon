var gulp = require('gulp');
	closure = require('gulp-closure-compiler');
	
gulp.task('default', function() {
  return gulp.src('dist/rust-webrcon.js')
    .pipe(closure({
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: 'dist/rust-webrcon.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
		output_wrapper: '(function(window){%output%})(window);',
        warning_level: 'VERBOSE',
		language_in: 'ECMASCRIPT6_TYPED',
		language_out: 'ECMASCRIPT5_STRICT'
      }
    }))
    .pipe(gulp.dest('dist'));
});
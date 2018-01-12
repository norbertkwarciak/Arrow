module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                // options: {
                //     outputStyle: 'compressed'
                // },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false // save all sourcemaps as separate files... 
                    // annotation: 'css' // ...to the specified directory 
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units 
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes 
                    require('cssnano')() // minify the result 
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', "!*.min.css"],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/build/'
                }]
            }
        },

        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                },
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*min.js'],
                    dest: 'js',
                    ext: '.min.js'
                }]
            }
        },

        jshint: {
            all: ['js/*.js', '!js/*.min.js']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html',
                }
            }
        },

        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: true,
                },
            },

            css: {
                files: ['css/*.css', '!css/*.min.css'],
                tasks: ['postcss:dist'],
                options: {
                    spawn: true,
                },
            },

            images: {
                files: ['assets/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            },

            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify', 'jshint'],
                options: {
                    atBegin: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'postcss:dist', 'imagemin', 'uglify', 'jshint', 'htmlmin'], ['watch']);
    grunt.registerTask('distro', ['htmlmin']);
};
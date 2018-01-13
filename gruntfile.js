module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['**/*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false
                },

                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({ browsers: 'last 2 versions' }),
                    require('cssnano')()
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

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['css/*.css', '*.html', 'js/*.min.js']
                },
                options: {
                    spawn: false,
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },

        watch: {
            sass: {
                files: ['**/*.scss'],
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
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'postcss:dist', 'imagemin', 'uglify', 'jshint', 'htmlmin', 'browserSync', 'watch']);
    grunt.registerTask('distro', ['htmlmin']);
};
module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['**/*.scss'],
                    dest: 'css',
                    ext: '.css'
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
                files: {
                    'js/app.min.js': ['js/scripts.js']
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'css/main.css': 'css/main.css'
                }
            },
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
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
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
                tasks: ['uglify'],
                options: {
                    atBegin: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'autoprefixer','imagemin', 'uglify', 'htmlmin'], ['watch']);
    grunt.registerTask('distro', ['htmlmin']);
};
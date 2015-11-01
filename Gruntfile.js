/*global module:false*/
module.exports = function(grunt) {

    // Globals
    var basehost = 'htdocs';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            init: [basehost + '/dist'],
            post: [
                basehost + '/dist/inc/js/modules', 
                basehost + '/dist/inc/js/main.js',
                basehost + '/dist/inc/css/main.css',
                basehost + '/dist/inc/scss',
                basehost + '/dist/inc/img/raw'
            ]
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
                sourceMap: true
            },
            dist: {
                src: [
                    basehost + '/dist/inc/js/main.js',
                    basehost + '/dist/inc/js/modules/module.js'
                ],
                dest: basehost + '/dist/inc/js/main.js'
            }
        },
        copy: {
            dist: {
                // makes all src relative to cwd
                expand: true, 
                cwd: basehost + '/src/', 
                src: ['**'], 
                dest: basehost + '/dist/'
            },
            rawimg: {
                expand: true,
                cwd: basehost + '/src/inc/img/raw/',
                src: ['**'],
                dest: basehost + '/src/inc/img/opt/'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: [basehost + '/dist/inc/css/**/*.css']
            },
            lax: {
                // options: {
                //     import: false
                // },
                // src: ['path/to/**/*.css']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: basehost + '/dist/inc/css',
                    src: ['*.css', '!*.min.css'],
                    dest: basehost + '/dist/inc/css',
                    ext: '.min.css'
                }]
            }
        },
        imageoptim: {
            dist: {
                src: [basehost + '/src/inc/img/opt/']
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                ignores: [basehost + '/dist/inc/js/vendor/**/*.js'],
                globals: {
                    jQuery: true,
                    console: true,
                    require: true
                }
            },
            beforeconcat: [basehost + '/dist/inc/js/**/*.js'],
            afterconcat: [basehost + '/dist/inc/js/main.js'],
            gruntfile: {
                src: 'Gruntfile.js'
            },
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 1 version']})
                ]
            },
            dist: {
                src: basehost + '/dist/inc/css/**/*.css'
            }
        },
        sass: {                              
            dist: {                            
                options: {      
                    lineNumbers: true,                 
                    trace: true,
                    update: false
                },
                files: [{
                    expand: true,
                    cwd: basehost + '/dist/inc/scss',
                    src: ['**/*.scss'],
                    dest: basehost + '/dist/inc/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: false,
                sourceMap: true
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: basehost + '/dist/inc/js/main.min.js'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task.
    grunt.registerTask('default', [
        'clean:init', 'newer:copy:rawimg', 'newer:imageoptim', 'copy:dist', 'concat', 'jshint',
        'uglify', 'sass:dist', 'csslint', 'postcss', 'cssmin', 'clean:post'
    ]);

};

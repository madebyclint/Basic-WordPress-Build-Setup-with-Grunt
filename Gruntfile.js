/*global module:false*/
module.exports = function(grunt) {

    // Globals
    var basehost = 'htdocs',
        themename = 'catchy2015',
        themepath = 'wp-content/themes/' + themename;

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
            init: [basehost + '/dist/' + themepath],
            post: [
                basehost + '/dist/' + themepath + '/inc/js/modules', 
                basehost + '/dist/' + themepath + '/inc/js/main.js',
                basehost + '/dist/' + themepath + '/inc/css/main.css',
                basehost + '/dist/' + themepath + '/inc/scss',
                basehost + '/dist/' + themepath + '/inc/img/raw'
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
                    basehost + '/dist/' + themepath + '/inc/js/main.js',
                    basehost + '/dist/' + themepath + '/inc/js/modules/module.js'
                ],
                dest: basehost + '/dist/' + themepath + '/inc/js/main.js'
            }
        },
        copy: {
            wp: {
                // makes all src relative to cwd
                expand: true, 
                cwd: basehost + '/src/', 
                src: ['**', '!**/' + themepath + '/**'], 
                dest: basehost + '/dist/'
            },
            dist: {
                // makes all src relative to cwd
                expand: true, 
                cwd: basehost + '/src/' + themepath + '/',
                src: ['**'], 
                dest: basehost + '/dist/' + themepath + '/'
            },
            rawimg: {
                expand: true,
                cwd: basehost + '/src/' + themepath + '/inc/img/raw/',
                src: ['**'],
                dest: basehost + '/src/' + themepath + '/inc/img/opt/'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: [basehost + '/dist/' + themepath + '/inc/css/**/*.css']
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
                    cwd: basehost + '/dist/' + themepath + '/inc/css',
                    src: ['*.css', '!*.min.css'],
                    dest: basehost + '/dist/' + themepath + '/inc/css',
                    ext: '.min.css'
                }]
            }
        },
        imageoptim: {
            dist: {
                src: [basehost + '/src/' + themepath + '/inc/img/opt/']
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
                ignores: [basehost + '/dist/' + themepath + '/inc/js/vendor/**/*.js'],
                globals: {
                    jQuery: true,
                    console: true,
                    require: true
                }
            },
            beforeconcat: [basehost + '/dist/' + themepath + '/inc/js/**/*.js'],
            afterconcat: [basehost + '/dist/' + themepath + '/inc/js/main.js'],
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
                src: basehost + '/dist/' + themepath + '/inc/css/**/*.css'
            }
        },
        sass: {                              
            dist: {                            
                options: {      
                    lineNumbers: true,                 
                    trace: true,
                    sourceMap: true,
                    update: false
                },
                files: [{
                    expand: true,
                    cwd: basehost + '/dist/' + themepath + '/inc/scss',
                    src: ['**/*.scss'],
                    dest: basehost + '/dist/' + themepath + '/inc/css',
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
                dest: basehost + '/dist/' + themepath + '/inc/js/main.min.js'
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
            },
            src: {
                files: [basehost + '/src/' + themepath + '/**/*.scss'],
                tasks: ['default'],
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
    // Ruby Sass
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-postcss');
    // LibSass
    grunt.loadNpmTasks('grunt-sass');

    require('time-grunt')(grunt);

    // Default task.
    grunt.registerTask('default', [
        'clean:init', 'newer:copy:rawimg', 'newer:imageoptim', 'newer:copy:dist', 'concat', 'jshint',
        'uglify', 'sass:dist', 'csslint', 'postcss', 'cssmin', 'clean:post'
    ]);

};

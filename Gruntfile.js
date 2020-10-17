//const { task } = require("gulp");

module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist:{
                files:[{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files:['css/*.scss'],
            tasks:['css']
        },
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
            options:{
                watchTask: true,
                server:{
                    baseDir: './'  //Directorio base para nuestro servidor
                }
              }
            },
            imagemin: {
                dynamic:{
                    files:[{
                        expand: true,
                        cwd: './',
                        src: 'img/*.{png,gif,jpg,jpeg}',
                        dest: 'dist/'
                    }]
                }
            }
         },
         filerev: {
            options: {
                encoding:'utf8',
                algorithm: 'md5',
              length: 20
            },
            images: {
              src: 'img/**/*.{jpg,jpeg,gif,png,webp}'
            }
          },
          concat: {
            options: {
              // define a string to put between each file in the concatenated output
              separator: ';'
            },
            dist: {
              // the files to concatenate
              src: ['src/**/*.js'],
              // the location of the resulting JS file
              dest: 'dist/<%= pkg.name %>.js'
            }
          },
          useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html','about.html','precios.html','contacto.html']
            },
            options: {
                flow :{
                  steps:{
                    css:['cssmin'],
                    js: ['uglify']
                  },  
            post: {
                
                css: [{
                        name: 'cssmin',
                        createConfig:function(context, block){
                            var generated = context.options.generated;
                            generated.options={
                                keeSpecialComments: 0,
                                rebase: false
                            }
                         }
                     }]
                 }
             }
         }
        },
        usemin: {
            html: [dist/indexedDB.html, 'dist/about.html', 'dist/precios.html', 'dist/contacto.html'],
                options: {
                    assetsDirs : ['dist', 'dist/css', 'dist/js']
        
            },
         },
        copy: {
            html:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src:['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean:{
            build:{
                src: ['dist/']
            }
        },
        cssmin:{
            dist:{}
         },
         uglify:{
            dist:{}
         }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTasks('css',['sass']);
    grunt.registerTasks('default',['browserSync','watch']);
    grunt.registerTasks('img:compress',['imagemin']);
    grunt.registerTasks('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        ]);
    
};
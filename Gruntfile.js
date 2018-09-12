module.exports = function(grunt) {

  // Update this variable if you don't want or can't serve on localhost
  var hostname = 'localhost';

  var PORT = {
    PROD : 9001,
    DEV : 9901,
    TEST : 9991
  };

  // create a version based on the build timestamp
  var dateFormat = require('dateformat');
  var version = '-' + dateFormat(new Date(), "yyyy-mm-dd-hh-MM");
  var releaseVersion = require('./package.json').version;
  var I18n = require('./src/js/requireI18n.js');


  /**
   * Helper to prefix all strings in provided array with the provided path
   */
  var prefixPaths = function (paths, prefix) {
    return paths.map(function (path) {
      return prefix + path;
    });
  };

  // get the list of scripts paths to include
  var scriptPaths = require('./src/piskel-script-list.js').scripts;
  var piskelScripts = prefixPaths(scriptPaths, "src/").filter(function (path) {
    return path.indexOf('devtools') === -1;
  });

  // get the list of styles paths to include
  var stylePaths = require('./src/piskel-style-list.js').styles;
  var piskelStyles = prefixPaths(stylePaths, "src/");

  // Casper JS tests
  var casperjsOptions = [
    '--baseUrl=http://' + hostname + ':' + PORT.TEST,
    '--mode=?debug',
    '--verbose=false',
    '--includes=test/casperjs/integration/include.js',
    '--log-level=info',
    '--print-command=false',
    '--print-file-paths=true',
  ];

  var integrationTestPaths = require('./test/casperjs/integration/IntegrationSuite.js').tests;
  var integrationTests = prefixPaths(integrationTestPaths, "test/casperjs/integration/");

  var getConnectConfig = function (base, port, host, open) {
    return {
      options: {
        port: port,
        hostname : host,
        base: base,
        open: open
      }
    };
  };

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      all: ['dest', 'src/img/icons.png', 'src/css/icons.css'],
      prod: ['dest/prod', 'dest/tmp'],
      desktop: ['dest/desktop', 'dest/tmp'],
      dev: ['dest/dev', 'dest/tmp']
    },

    /**
     * STYLE CHECKS
     */

    leadingIndent : {
      options: {
        indentation : "spaces"
      },
      css : ['src/css/**/*.css']
    },

    eslint: {
      files: [
        // Includes
        'src/js/**/*.js',
        // Exludes
        // TODO: remove this (for now we still get warnings from the lib folder)
        '!src/js/**/lib/**/*.js'
      ]
    },

    /**
     * SERVERS, BROWSER LAUNCHERS
     */

    connect: {
      prod: getConnectConfig('dest/prod', PORT.PROD, hostname, true),
      test: getConnectConfig(['dest/dev', 'test'], PORT.TEST, hostname, false),
      dev: getConnectConfig(['dest/dev', 'test'], PORT.DEV, hostname, 'http://' + hostname + ':' + PORT.DEV + '/?debug')
    },

    watch: {
      prod: {
        files: ['src/**/*.*'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      },
      dev: {
        files: ['src/**/*.*'],
        tasks: ['build-dev'],
        options: {
          spawn: false
        }
      }
    },

    /**
     * BUILD STEPS
     */

    sprite:{
      all : {
        src: 'src/img/icons/**/*.png',
        retinaSrcFilter: 'src/img/icons/**/*@2x.png',
        dest: 'src/img/icons.png',
        retinaDest: 'src/img/icons@2x.png',
        destCss: 'src/css/icons.css'
      }
    },

    concat : {
      js : {
        options : {
          separator : ';'
        },
        src : piskelScripts,
        dest : 'dest/prod/js/piskel-packaged' + version + '.js'
      },
      css : {
        src : piskelStyles,
        dest : 'dest/tmp/css/piskel-style-packaged' + version + '.css'
      }
    },

    uglify : {
      options : {
        mangle : true
      },
      js : {
        files : {
          'dest/tmp/js/piskel-packaged-min.js' : ['dest/prod/js/piskel-packaged' + version + '.js']
        }
      }
    },

    includereplace: {
      all: {
        src: 'src/index.html',
        dest: 'dest/tmp/index.html',
        options : {
          globals : {
            'Settings' : I18n.translate('Settings'),
            'Scale_the_animation' : I18n.translate('Scale the animation for export'),
            'Scale' : I18n.translate('Scale'),
            'Resolution' : I18n.translate('Resolution'),
            'GIF' : I18n.translate('GIF'),
            'PNG_export_of_the_currently_selected_frame.': I18n.translate('PNG_export_of_the_currently_selected_frame.'),
            'PNG' : I18n.translate('PNG'),
            'Zip' : I18n.translate('Zip'),
            'Others' : I18n.translate('Others'),
            'EXPORT' : I18n.translate('EXPORT'),
            'Exported_image_as_data-uri' : I18n.translate('Exported_image_as_data-uri'),
            'Data-uri_for_the_exported_framesheet' : I18n.translate('Data-uri_for_the_exported_framesheet'),
            'Primary_-_left_mouse_button' : I18n.translate('Primary_-_left_mouse_button'),
            'Secondary_-_right_mouse_button' : I18n.translate('Secondary_-_right_mouse_button'),
            'Swap_colors_(X)' : I18n.translate('Swap_colors_(X)'),
            'No_color_in_this_palette...' : I18n.translate('No_color_in_this_palette...'),
            'ExportTITLE' : I18n.translate('Export'),
            'Load_from_Browser' : I18n.translate('Load_from_Browser'),
            'Browse_local_saves' : I18n.translate('Browse_local_saves'),
            'Load_.piskel_file' : I18n.translate('Load_.piskel_file'),
            'Browse_.piskel_files' : I18n.translate('Browse_.piskel_files'),
            'Import_From_Picture' : I18n.translate('Import_From_Picture'),
            'Browse_images' : I18n.translate('Browse_images'),
            'Recover_recent_sessions' : I18n.translate('Recover_recent_sessions'),
            'Browse_backups_of_previous_sessions.' : I18n.translate('Browse_backups_of_previous_sessions.'),
            'Browse_backups' : I18n.translate('Browse_backups'),
            'Maintain_aspect_ratio' : I18n.translate('Maintain_aspect_ratio'),
            'Resize_canvas_content' : I18n.translate('Resize_canvas_content'),
            'Anchor' : I18n.translate('Anchor'),
            'Resize' : I18n.translate('Resize'),
            'Default_size' : I18n.translate('Default_size'),
            'Width' : I18n.translate('Width'),
            'Height' : I18n.translate('Height'),
            'Set_default' : I18n.translate('Set_default'),
            'Sprite_Information' : I18n.translate('Sprite_Information'),
            'Title_: ' : I18n.translate('Title_'),
            'Description_: ' : I18n.translate('Description_'),
            'Public :' : I18n.translate('Public :'),
            'Save_online' : I18n.translate('Save_online'),
            'Your_piskel_will_be_stored_online_in_your_gallery.' : I18n.translate('Your_piskel_will_be_stored_online_in_your_gallery'),
            'Saving_to_the_gallery_might_fail_due_to_the_sprite_size.' : I18n.translate('Saving_to_the_gallery_might_fail_due_to_the_sprite_size'),
            'Your_piskel_will_be_saved_locally_and_will_only_be_accessible_from_this_browser.' : I18n.translate('Your_piskel_will_be_saved_locally_and_will_only_be_accessible_from_this_browser.'),
            'Save_as_File' : I18n.translate('Save_as_File'),
            'SaveBTN' : I18n.translate('Save'),
            'Save_as_other' : I18n.translate('Save_as_other'),
            'Your_sprite_will_be_downloaded_as_a_.piskel_file.' : I18n.translate('Your_sprite_will_be_downloaded_as_a_.piskel_file.'),
            'Misc' : I18n.translate('Misc'),
            'GridTITLE' : I18n.translate('Grid'),
            'Tile_mode' : I18n.translate('Tile_mode'),
            'Background' : I18n.translate('Background'),
            'Layer_opacity' : I18n.translate('Layer_opacity'),
            'Maximum_FPS' : I18n.translate('Maximum_FPS'),
            'Color_format' : I18n.translate('Color_format'),
            'Piskel' : I18n.translate('Piskel'),
            'Save_offline_as_File' : I18n.translate('Save_offline_as_File'),
            'Save_offline_in_Browser' : I18n.translate('Save_offline_in_Browser'),
            'Save_in_Browser' : I18n.translate('Save_in_Browser'),
            'Save_as_.piskel' : I18n.translate('Save_as_.piskel'),
            'Convert_your_sprite_to_an_animated_GIF.' : I18n.translate('Convert_your_sprite_to_an_animated_GIF.'),
            'Loop_repeatedly' : I18n.translate('Loop_repeatedly'),
            'Download_as_an_animated_GIF.' : I18n.translate('Download_as_an_animated_GIF.'),
            'Download_ZIP':I18n.translate('Download_ZIP'),
            'Download_C_file': I18n.translate('Download_C_file'),
            'Download' : I18n.translate('Download'),
            'Upload_as_an_animated_GIF_to_a_public_URL.' : I18n.translate('Upload_as_an_animated_GIF_to_a_public_URL.'),
            'Upload' : I18n.translate('Upload'),

            'Export_your_animation_as_a_PNG_spritesheet_containing_all_frames.' : I18n.translate('Export_your_animation_as_a_PNG_spritesheet_containing_all_frames.'),

            'Create Palette': I18n.translate('Create Palette'),

            'Create_Palette': I18n.translate('Create_Palette'),
            'Current colors clone': I18n.translate('Current colors clone'),
            'Import_from_file': I18n.translate('Import_from_file'),
            'Name': I18n.translate('Name'),
            'palette_name_...': I18n.translate('palette_name_...'),
            'Download_the_palette_as_a_GPL_file': I18n.translate('Download_the_palette_as_a_GPL_file'),
            'DOWN.PALLETTE_as_file': I18n.translate('Download_as_file'),
            'Import_palette_from_an_existing_Image_or_from_a_palette_file': I18n.translate('Import_palette_from_an_existing_Image_or_from_a_palette_file'),
            'CancelBTN': I18n.translate('Cancel'),
            'DeleteBTN': I18n.translate('Delete'),
            'To_data-uri': I18n.translate('To_data-uri'),
            'Open_the_PNG_export_in_your_browser_as_a_data': I18n.translate('Open_the_PNG_export_in_your_browser_as_a_data'),

            'ZIP_archive_containing_one_PNG_for_each_frame._File_names_will_start_with_the_prefix_below.': I18n.translate('ZIP_archive_containing_one_PNG_for_each_frame._File_names_will_start_with_the_prefix_below.'),
            'Export_for_PixiJS_Movie:_':I18n.translate('Export_for_PixiJS_Movie:_'),

            'Spritesheet_with_JSON_metadata':I18n.translate('Spritesheet_with_JSON_metadata'),
            'Prefix':I18n.translate('Prefix'),

            'Split_by_layers':I18n.translate('Split_by_layers'),

            'Less_usual_export_formats._Feedback_and_improvements_welcome.': I18n.translate('Less_usual_export_formats._Feedback_and_improvements_welcome.'),
            'Export_as_C_File:_': I18n.translate('Export_as_C_File:_'),
            'C_file_with_frame_rendered_as_array.': I18n.translate('C_file_with_frame_rendered_as_array.'),

            'Export_selected_frame_as_PNG_File:_': I18n.translate('Export_selected_frame_as_PNG_File:_'),


            'Enable_grid':I18n.translate('Enable_grid'),
            'Grid_size':I18n.translate('Grid_size'),
            'Grid_spacing':I18n.translate('Grid_spacing'),
            'Grid_color':I18n.translate('Grid_color'),

            'Enable_tile_mode': I18n.translate('Enable_tile_mode'),
            'Mask_opacity': I18n.translate('Mask_opacity'),
            'Keyboard_shortcuts': I18n.translate('Keyboard_shortcuts'),
            'Tool_shortcuts': I18n.translate('Tool_shortcuts'),
            'Misc_shortcuts': I18n.translate('Misc_shortcuts'),
            'Selection_shortcuts': I18n.translate('Selection_shortcuts'),
            'Color_shortcuts': I18n.translate('Color_shortcuts'),
            'Storage_shortcuts': I18n.translate('Storage_shortcuts'),
            'Customize_shortcuts_?': I18n.translate('Customize_shortcuts_?'),
            'Restore_default_shortcuts': I18n.translate('Restore_default_shortcuts'),
            'Create_a_new_sprite': I18n.translate('Create_a_new_sprite'),

            'LOGIN_TO_A':I18n.translate('LOGIN_TO_A'),
            'LOGIN_TO_B':I18n.translate('LOGIN_TO_B'),
            'LOGIN_TO_SITE':I18n.translate('LOGIN_TO_SITE'),
            'LOGIN_TO_SITE_URL':I18n.translate('LOGIN_TO_SITE_URL'),

            'light_/_high_contrast': I18n.translate('light_/_high_contrast'),
            'medium_/_high_contrast': I18n.translate('medium_/_high_contrast'),
            'medium_/_low_contrast': I18n.translate('medium_/_low_contrast'),
            'dark_/_low_contrast': I18n.translate('dark_/_low_contrast'),

            'Browse_Local_Piskels': I18n.translate('Browse_Local_Piskels'),
            'Date': I18n.translate('Date'),
            'Actions': I18n.translate('Actions'),
            'Browse_backups': I18n.translate('Browse_backups'),
            'If_you_forgot_to_save_your_work_or_if_Piskel_crashed': I18n.translate('If_you_forgot_to_save_your_work_or_if_Piskel_crashed'),
            'Backups_may_be_erased_without_notice': I18n.translate('Backups_may_be_erased_without_notice'),
            'No_session_found_...': I18n.translate('No_session_found_...'),
            'Could_not_load_backup_sessions,_something_went_wrong.': I18n.translate('Could_not_load_backup_sessions,_something_went_wrong.'),
            'Delete': I18n.translate('Delete'),
            'View': I18n.translate('View'),
            'back': I18n.translate('back'),
            'No_snapshot_found_...': I18n.translate('No_snapshot_found_...'),
            'Could_not_load_snapshots,_something_went_wrong.': I18n.translate('Could_not_load_snapshots,_something_went_wrong.'),
            'Load': I18n.translate('Load'),
            'Session_recorded': I18n.translate('Session_recorded'),

            '__':I18n.translate('__'),

            'version' : version,
            'releaseVersion' : releaseVersion
          }
        }
      }
    },

    replace: {
      // main-partial.html is used when embedded in piskelapp.com
      mainPartial: {
        options: {
          patterns: [{
              match: /^(.|[\r\n])*<!--body-main-start-->/,
              replacement: "{% raw %}",
              description : "Remove everything before body-main-start comment"
            },{
              match: /<!--body-main-end-->(.|[\r\n])*$/,
              replacement: "{% endraw %}",
              description : "Remove everything after body-main-end comment"
            },{
              match: /([\r\n])  /g,
              replacement: "$1",
              description : "Decrease indentation by one"
            }
          ]
        },
        files: [
          // src/index.html should already have been moved by the includereplace task
          {src: ['dest/tmp/index.html'], dest: 'dest/prod/piskelapp-partials/main-partial.html'}
        ]
      },

      css: {
        options: {
          patterns: [{
            match: /var\(--highlight-color\)/g,
            replacement: "gold",
          }]
        },
        files: [{
          src: ['dest/tmp/css/piskel-style-packaged' + version + '.css'],
          dest: 'dest/prod/css/piskel-style-packaged' + version + '.css'
        }]
      }
    },

    copy: {
      prod: {
        files: [
          // dest/js/piskel-packaged-min.js should have been created by the uglify task
          {src: ['dest/tmp/js/piskel-packaged-min.js'], dest: 'dest/prod/js/piskel-packaged-min' + version + '.js'},
          {src: ['dest/tmp/index.html'], dest: 'dest/prod/index.html'},
          {src: ['src/logo.png'], dest: 'dest/prod/logo.png'},
          {src: ['src/js/lib/gif/gif.ie.worker.js'], dest: 'dest/prod/js/lib/gif/gif.ie.worker.js'},
          {src: ['src/js/I18n.js'], dest: 'dest/prod/js/I18n.js'},
          {expand: true, src: ['img/**'], cwd: 'src/', dest: 'dest/prod/', filter: 'isFile'},
          {expand: true, src: ['css/fonts/**'], cwd: 'src/', dest: 'dest/prod/', filter: 'isFile'}
        ]
      },
      dev: {
        files: [
          // in dev copy everything to dest/dev
          {src: ['dest/tmp/index.html'], dest: 'dest/dev/index.html'},
          {src: ['src/piskel-script-list.js'], dest: 'dest/dev/piskel-script-list.js'},
          {src: ['src/piskel-style-list.js'], dest: 'dest/dev/piskel-style-list.js'},
          {expand: true, src: ['js/**'], cwd: 'src/', dest: 'dest/dev/', filter: 'isFile'},
          {expand: true, src: ['css/**'], cwd: 'src/', dest: 'dest/dev/', filter: 'isFile'},
          {expand: true, src: ['img/**'], cwd: 'src/', dest: 'dest/dev/', filter: 'isFile'},
        ]
      }
    },

    /**
     * TESTING
     */

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    casperjs : {
      drawing : {
        files : {
          src: ['test/casperjs/DrawingTest.js']
        },
        options : {
          casperjsOptions: casperjsOptions
        }
      },
      integration : {
        files : {
          src: integrationTests
        },
        options : {
          casperjsOptions: casperjsOptions
        }
      }
    },

    /**
     * DESKTOP BUILDS
     */

    nwjs: {
      windows : {
        options: {
          downloadUrl: 'https://dl.nwjs.io/',
          version : "0.19.4",
          build_dir: './dest/desktop/', // destination folder of releases.
          win: true,
          linux32: true,
          linux64: true,
          flavor: "normal",
        },
        src: ['./dest/prod/**/*', "./package.json", "!./dest/desktop/"]
      },
      macos : {
        options: {
          downloadUrl: 'https://dl.nwjs.io/',
          osx64: true,
          version : "0.19.4",
          build_dir: './dest/desktop/',
          flavor: "normal",
        },
        src: ['./dest/prod/**/*', "./package.json", "!./dest/desktop/"]
      },
      macos_old : {
        options: {
          downloadUrl: 'https://dl.nwjs.io/',
          osx64: true,
          version : "0.12.3",
          build_dir: './dest/desktop/old',
          flavor: "normal",
        },
        src: ['./dest/prod/**/*', "./package.json", "!./dest/desktop/"]
      }
    }
  });

  // TEST TASKS
  // Run linting
  grunt.registerTask('lint', ['eslint', 'leadingIndent:css']);
  // Run unit-tests
  grunt.registerTask('unit-test', ['karma']);
  // Run integration tests
  grunt.registerTask('integration-test', ['build-dev', 'connect:test', 'casperjs:integration']);
  // Run drawing tests
  grunt.registerTask('drawing-test', ['build-dev', 'connect:test', 'casperjs:drawing']);
  // Run linting, unit tests, drawing tests and integration tests
  grunt.registerTask('test', ['lint', 'unit-test', 'build-dev', 'connect:test', 'casperjs:drawing', 'casperjs:integration']);

  // Run the tests, even if the linting fails
  grunt.registerTask('test-nolint', ['unit-test', 'build-dev', 'connect:test', 'casperjs:drawing', 'casperjs:integration']);

  // Used by optional precommit hook
  grunt.registerTask('precommit', ['test']);

  // BUILD TASKS
  grunt.registerTask('build-index.html', ['includereplace']);
  grunt.registerTask('merge-statics', ['concat:js', 'concat:css', 'uglify']);
  grunt.registerTask('build',  ['clean:prod', 'sprite', 'merge-statics', 'build-index.html', 'replace:mainPartial', 'replace:css', 'copy:prod']);
  grunt.registerTask('build-dev',  ['clean:dev', 'sprite', 'build-index.html', 'copy:dev']);
  grunt.registerTask('desktop', ['clean:desktop', 'default', 'nwjs:windows']);
  grunt.registerTask('desktop-mac', ['clean:desktop', 'default', 'nwjs:macos']);
  grunt.registerTask('desktop-mac-old', ['clean:desktop', 'default', 'replace:desktop', 'nwjs:macos_old']);

  // SERVER TASKS
  // Start webserver and watch for changes
  grunt.registerTask('serve', ['build', 'connect:prod', 'watch:prod']);
  // Start webserver on src folder, in debug mode
  grunt.registerTask('play', ['build-dev', 'connect:dev', 'watch:dev']);

  // ALIASES, kept for backward compatibility
  grunt.registerTask('serve-debug', ['play']);
  grunt.registerTask('serve-dev', ['play']);
  grunt.registerTask('test-travis', ['test']);
  grunt.registerTask('test-local', ['test']);

  // Default task
  grunt.registerTask('default', ['lint', 'build']);
};

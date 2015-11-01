/**
 * Module.js 0.0
 *
 * Clint Bush http://madebyclint.com
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 *
 * This is the child module file that will get concatenated
 * to the the Main.js file via grunt.
 */



var Module = (function() {
    var module = this;

    module.init = function() {
        console.log('Init method of Module.js');
    };

    return module;
})();

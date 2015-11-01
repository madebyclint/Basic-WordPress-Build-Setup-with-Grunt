/**
 * Main.js 0.0
 *
 * Copyright 2015, Clint Bush http://madebyclint.com
 * License info goes here (Example: Released under the WTFPL license)
 * License url goes here (Example: http://sam.zoy.org/wtfpl/)
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 *
 * This is the parent js file. All modules will be concatenated
 * to this file via grunt.
 */



// Avoid `console` errors in browsers that lack a console.
// Must come before any js that might include a console call.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



var Main = (function() {
    var main = this;

    main.init = function() {
        console.log('Init method of Main.js');
    };
})();
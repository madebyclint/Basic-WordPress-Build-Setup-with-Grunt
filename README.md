# Basic HTML Build Setup with Grunt and Timber
<div>
By Clint Bush (<a href="http://twitter.com/madebyclint">@madebyclint</a>)</div>
</div>

## Why?
Because I got tired of creating new WordPress builds from scratch

<!-- <div style="text-align:center">
<a href="http://jarednova.github.com/timber"><img src="http://i.imgur.com/oM1AHrz.jpg" style="display:block; margin:auto; width:100%; max-width:100%"/></a> -->

## Goals
1. Keep only source (`src`) files in Git
    - No WordPress core files since they can easily be downloaded again and should always be kept up-to-date anyway 
    - Only original images and non-optimized images should be kept in Git. I know this may be a sin to some, but I wanted to make sure any images part of the theme were always kept with the theme
2. Build or distributed folder `dist` contains all deployment ready code. This includes:
    + Optimized images
    + WordPress core files
    + Concatenated (with sourcemaps), minimized and linted CSS and Javascript files
    + Validated HTML files
3. Optimize images
4. Easy to setup
5. Fast to build
    + Minimal commands to build
    + Use LibSass for faster compiling of `.scss` files
    + Only optimize images once
    + Exclude WordPress core from build


### Dependencies

**PLATFORMS, SOFTWARE, LIBRARIES**  

+ Node
+ Ruby (for image optimization gems and Sass)
+ Apache/PHP
+ MAMP or other PHP server (for running PHP locally)
+ Composer (for installing Timber)
+ Git (obviously)
+ Timber
+ jQuery
+ LibSass

**NODES (NPM)**
Just run `npm install` from your root folder to install these dependencies

+ autoprefixer
+ grunt
+ grunt-cli
+ grunt-contrib-clean
+ grunt-contrib-concat
+ grunt-contrib-copy
+ grunt-contrib-csslint
+ grunt-contrib-jshint
+ grunt-contrib-sass (as fallback)
+ grunt-contrib-uglify
+ grunt-contrib-watch
+ grunt-newer
+ grunt-notify
+ grunt-postcss
+ grunt-sass
+ time-grunt
Grunt, Timber, Twig, jQuery, Sass (libsass), ?? - gems, nodes)

##How to use
Coming sometime...


##Gruntfile.js Explained
Coming sometime...


## Changelog

| VERSION | DATE | MESSAGE |
| --- | --- | --- |
| v 1.2 | Fri Nov 6 07:07:01 2015 -0800 | Watch more files for default build. Add grunt notify for desktop notifications after build is complete. <br><br>commit 570908750b1cadfc12cee2ee1ebc82160891bdd0 |
| v 1.1 | Thu Nov 5 23:37:48 2015 -0800 | Speed up build using LibSass and removing WP core copy. <br><br>commit 72c5d32ca6e7a2ac1398461ee3a009654a14b03e |
| v 1.0 | Thu Nov 5 22:53:31 2015 -0800 | Finish basic setup with WordPress using Timber and grunt. <br><br>commit 678611a5b63365f7fa2a966573437880d4f3e970 | 
| v 0.3 | Sun Nov 1 08:10:07 2015 -0800 | Revise Basic-HTML-Build-Setup-with-Grunt to Basic-WordPress-Build-Setup-with-Grunt. <br><br>commit 1486f39cc8b8948bbea65a9cbc73dcdeb1d2603c|
| v 0.2 | Sun Nov 1 06:49:47 2015 -0800 | Merge branch 'master' of github.com:madebyclint/Basic-HTML-Build-Setup-with-Grunt. <br><br>commit 43dcf11df9efd7dabed575bc2f3725c628842bd6|
| v 0.1 | Sun Nov 1 01:10:52 2015 -0700 | Inital commit and build of basic HTML structure. <br><br>commit a8c94f8c718a267b488736f596cee8735e99e443 |
| v 0.0 | Sun Nov 1 01:07:24 2015 -0700 | Initial commit. <br><br>commit 6e7be909d4530b0d756fccb64a426b28b9609b54 |

##Next steps:

1. Finish documentation
2. Add grunt init task for intializing `dist` folder
3. Add build/version numbers
4. Create Bower for easy installing?



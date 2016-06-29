(function(global) {
    var map = {
        'app': 'app',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',

        '@ngrx/core': 'node_modules/@ngrx/core',
        '@ngrx/store': 'node_modules/@ngrx/store',
        '@ngrx/router': 'node_modules/@ngrx/router',

        // @ngrx/router dependencies
        'path-to-regexp': 'node_modules/path-to-regexp',
        'isarray': 'node_modules/isarray',
        'query-string': 'node_modules/query-string',
        'strict-uri-encode': 'node_modules/strict-uri-encode',
        'object-assign': 'node_modules/object-assign'
    },
    packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        '@ngrx/core': { main: 'index.js', defaultExtension: 'js'},
        '@ngrx/store': { main: 'index.js', defaultExtension: 'js'},
        '@ngrx/router': {main: 'index.js', defaultExtension: 'js'},
        // @ngrx/router dependencies
        'path-to-regexp': {main: 'index.js', defaultExtension: 'js'},
        'isarray': {main: 'index.js', defaultExtension: 'js'},
        'query-string': {main: 'index.js', defaultExtension: 'js'},
        'strict-uri-encode': {main: 'index.js', defaultExtension: 'js'},
        'object-assign': {main: 'index.js', defaultExtension: 'js'}
    },
    ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'upgrade'
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    var setPackageConfig = packUmd;
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
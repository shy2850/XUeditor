
var base = __dirname;
var path = require('path');

exports.staticconf = {
    port: 8891
};

exports["localhost"] = {
    "root": base,
    "uploadFile": true,
    "port": 8889,
    "gzip": true,
    "buildFilter": function (pathname) {
        if (/^\Wthird-party\b/.test(pathname)) {
            return;
        }
        else {
    	   return /^\W*(dialogs|lang|themes|action|ueditor|package)\b/.test(pathname);
        }
    },
    "include": '@import\\s*"([^"]+)";',
    agent: {
        get: function (pathname) {
            if (pathname.match(/themes\/default\/css/)) {
                return {
                    host: 'localhost',
                    port: 8889,
                    path: function () {
                        return pathname.replace('css', '_css');
                    }
                }
            }
        }
    },
    renameMap: [
        {
            reg: /themes\/default\/_css/,
            release: 'themes/default/css',
            withBuild: true
        }
    ],
    "output": path.join(base, '../dist/')
};

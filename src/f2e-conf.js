
var base = __dirname;
var path = require('path');

exports["localhost"] = {
    "root": base,
    "uploadFile": true,
    "port": 80,
    "buildFilter": function (pathname) {
    	return /^\W*(dialogs|lang|themes|third-party|action|ueditor)\b/.test(pathname);
    },
    "include": /@import\s*"([^"]+)";/,
    agent: {
        get: function (pathname) {
            if (pathname.match(/themes\/default\/css/)) {
                return {
                    path: function () {
                        return pathname.replace('css', '_css');
                    }
                }
            }
        }
    },
    "output": path.join(base, '../dist/')
};

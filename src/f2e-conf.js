
var base = __dirname;
var path = require('path');

exports["localhost"] = {
    "root": base,
    "uploadFile": true,
    "port": 80,
    "buildFilter": function (pathname) {
    	console.log(pathname);
    	return /^\W*(dialogs|lang|themes|third-party|ueditor\.)\b/.test(pathname);
    },
    "output": path.join(base, '../dist/')
};

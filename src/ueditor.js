(function () {
    /* <%
    var paths  = $include["api.js"];
    var fs = require('fs');
    var path = require('path');
    var root = path.join(request.util.conf.root, request.$.title, '../_src/');
    __p += "*\/\n";
    for (var i=0,pi;pi = paths[i++];) {
        __p += fs.readFileSync(path.join(root, pi));
    }
    __p += "\n\/*";
    %>*/
})();

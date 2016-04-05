/*!
 * UEditor
 * version: ueditor
 * build: <%=new Date%>
 */

 (function () {<%
    var paths  = $include["api.js"];
    var fs = require('fs');
    var path = require('path');
    var root = path.join(request.util.conf.root, request.$.title, '../_src/');
    for (var i=0,pi;pi = paths[i++];) {
        __p += '\n\n\/\/ ' + pi + '\n' + fs.readFileSync(path.join(root, pi));
    }%>
})();

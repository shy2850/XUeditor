/*!
 * UEditor
 * version: ueditor
 * build: <%=new Date%>
 */

 (function () {<%
    var paths  = @import "api.js";
    var fs = require('fs');
    var path = require('path');
    var root = path.join(request.util.conf.root, request.$.title, '../_src/');
    for (var i=0,pi;pi = paths[i++];) {
        var txt = fs.readFileSync(path.join(root, pi)).toString();
        switch (pi) {
            case 'adapter/editor.js':
                txt = txt.replace('_css', 'css');
                break;
        }
        __p += '\n\n\/\/ ' + pi + '\n' + txt;
    }%>
})();

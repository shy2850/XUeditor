/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = $include["../api.js"],
        baseURL = '../_src/';

    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();

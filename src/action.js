<%
    var CONFIG = @import "ueditor.json";
    var action = request.data['action'] || 'config';
    var fileItem = request.files;
    var f = {};
    if (fileItem && fileItem.length) {
        file = fileItem[0].file;
        f.name = file.name;
        f.state = "SUCCESS";
        f.url = '/uploads/' + file.name;
        f.title = file.name;
        f.original = file.name;
    }

    switch (action) {
        case 'config':
            print(JSON.stringify(CONFIG));
            break;

        /* 上传图片 */
        case 'uploadimage':
        /* 上传涂鸦 */
        case 'uploadscrawl':
        /* 上传视频 */
        case 'uploadvideo':
        /* 上传文件 */
        case 'uploadfile':
        default:
            print(JSON.stringify(f));
            break;
    }
    return function () {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.end(__p);
    };
%>
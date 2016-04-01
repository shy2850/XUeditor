<%
    var CONFIG = $include["ueditor.json"];
    var action = request.data['action'];
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
            print(JSON.stringify(f));
            break;

        /* 列出图片 */
        case 'listimage':
            break;
        /* 列出文件 */
        case 'listfile':
            break;

        /* 抓取远程文件 */
        case 'catchimage':
            break;

        default:
            break;
    }
%>
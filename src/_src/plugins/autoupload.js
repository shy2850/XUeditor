/**
 * @description
 * 1.拖放文件到编辑区域，自动上传并插入到选区
 * 2.插入粘贴板的图片，自动上传并插入到选区
 * @author Jinqn
 * @date 2013-10-14
 */
UE.plugin.register('autoupload', function (){

    function getPasteImage(e){
        return e.clipboardData && e.clipboardData.items && e.clipboardData.items.length == 1 && /^image\//.test(e.clipboardData.items[0].type) ? e.clipboardData.items:null;
    }
    function getDropImage(e){
        return  e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files:null;
    }

    return {
        outputRule: function(root){
            utils.each(root.getNodesByTagName('img'),function(n){
                if (/\b(loaderrorclass)|(bloaderrorclass)\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
            utils.each(root.getNodesByTagName('p'),function(n){
                if (/\bloadpara\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
        },
        bindEvents:{
            defaultOptions: {
                //默认间隔时间
                enableDragUpload: true,
                enablePasteUpload: true
            },
            //插入粘贴板的图片，拖放插入图片
            'ready':function(e){
                var me = this;
                if(window.FormData && window.FileReader) {
                    var handler = function(e){
                        var hasImg = false,
                            items;
                        console.log(e);
                        //获取粘贴板文件列表或者拖放文件列表
                        items = e.type == 'paste' ? getPasteImage(e):getDropImage(e);
                        if(items){
                            var len = items.length,
                                file;
                            while (len--){
                                file = items[len];
                                if(file.getAsFile) file = file.getAsFile();
                                if(file && file.size > 0) {
                                    UE.utils.sendAndInsertFile(file, me);
                                    hasImg = true;
                                }
                            }
                            hasImg && e.preventDefault();
                        }

                    };

                    if (me.getOpt('enablePasteUpload') !== false) {
                        domUtils.on(me.body, 'paste ', handler);
                    }
                    if (me.getOpt('enableDragUpload') !== false) {
                        domUtils.on(me.body, 'drop', handler);
                        //取消拖放图片时出现的文字光标位置提示
                        domUtils.on(me.body, 'dragover', function (e) {
                            if(e.dataTransfer.types[0] == 'Files') {
                                e.preventDefault();
                            }
                        });
                    } else {
                        if (browser.gecko) {
                            domUtils.on(me.body, 'drop', function(e){
                                if (getDropImage(e)) {
                                    e.preventDefault();
                                }
                            });
                        }
                    }

                    //设置loading的样式
                    utils.cssRule('loading',
                        '.loadingclass{display:inline-block;cursor:default;background: url(\''
                            + this.options.themePath
                            + this.options.theme +'/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n' +
                            '.loaderrorclass{display:inline-block;cursor:default;background: url(\''
                            + this.options.themePath
                            + this.options.theme +'/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                            '}',
                        this.document);
                }
            }
        }
    }
});
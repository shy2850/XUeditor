/**
 * @file 默认/全屏 菜单显示切换
 * 需要配合ueditor.css
 * @since 1.5.0
 */
UE.plugins.toggleMenuBox = function () {
    var me = this;
    if (!me.options.defaultToolbars || !me.options.defaultToolbars.length) {
        return;
    }
    var boxes = me.options.defaultToolbars[0];
    me.ready(function () {
        utils.cssRule('togglemenubox',
              '.edui-default .edui-toolbar > .edui-box-hide{display: none !important;}'
            + '.edui-mode-fullscreen .edui-default .edui-toolbar > .edui-box-hide'
            + '{display: -moz-inline-box !important;display: inline-block !important;}',
            document);
        var buttons = UE.ui.buttons;
        utils.each(buttons, function (item, key) {
            if (utils.indexOf(boxes, key) == -1) {
                var menu = item.getDom();
                domUtils.addClass(menu, 'edui-box-hide');
            }
        });
        me.addListener('fullscreenchanged', function (type, mode) {
            if (mode) {
                domUtils.addClass(me.container, 'edui-mode-fullscreen');
            }
            else {
                domUtils.removeClasses(me.container, 'edui-mode-fullscreen');
            }
        });
    });
};
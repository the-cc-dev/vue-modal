module.exports = function () {

    var __modal = null;

    var __defaultOptions = {
        transition: 'modal-fade',
        
        transitionBg: 'modal-fade',

        dismissable: false
    };

    function _init(name) {
        if (!__modal.instances[name]) {
            __modal.instances[name] = Object.assign({}, __modal.options);

            __modal.Vue.set(__modal.$vm.instances, name, {
                visible: false
            });
        }
    }

    function _visible() {
        var i;

        for (i in __modal.$vm.instances) {
            if (__modal.$vm.instances[i].visible) {
                return true;
            }
        }
    }

    function _hasScrollbar() {

        // The Modern solution
        if (typeof window.innerWidth === 'number') {
            return window.innerWidth > document.documentElement.clientWidth;
        }

        // KEEPING BELOW FOR REFERENCE

        // // rootElem for quirksmode
        // var rootElem = document.documentElement || document.body;

        // // Check overflow style property on body for fauxscrollbars
        // var overflowStyle;

        // if (typeof rootElem.currentStyle !== 'undefined') {
        //     overflowStyle = rootElem.currentStyle.overflow;
        // }

        // overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

        // // Also need to check the Y axis overflow
        // var overflowYStyle;

        // if (typeof rootElem.currentStyle !== 'undefined') {
        //     overflowYStyle = rootElem.currentStyle.overflowY;
        // }

        // overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

        // var contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
        // var overflowShown    = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle);
        // var alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

        // return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }

    function Modal(Vue, options) {
        this.options = Object.assign({}, __defaultOptions, options);

        this.Vue = Vue;

        this.$vm = new Vue({
            data: function() {
                return {
                    instances: {}
                };
            }
        });

        this.instances = {};

        __modal = this;
    }

    Modal.prototype.show = function (name, data) {
        var cb,
            elFocus;

        _init(name);

        __modal.hide();

        __modal.$vm.instances[name].visible = true;

        cb = __modal.instances[name].onShow;

        if (_hasScrollbar()) {
            document.body.style.paddingRight = '18px';
        }
        
        document.body.style.overflow = 'hidden';

        elFocus = document.getElementById(name + '-focus');

        if (elFocus) {
            setTimeout(function() {
                elFocus.focus();
            }, 250);
        }

        if (cb) {
            cb(data);
        }
    };

    Modal.prototype.dismiss = function (name, data) {
        var cb;

        _init(name);

        if (!__modal.instances[name].dismissable) {
            return;
        }

        __modal.$vm.instances[name].visible = false;

        cb = __modal.instances[name].onDismiss || __modal.instances[name].onHide;

        if (cb) {
            cb(data);
        }
    };

    Modal.prototype.hide = function (name, data) {
        var i, cb;        

        _init(name);
        
        if (!name) {
            for (i in __modal.$vm.instances) {
                __modal.$vm.instances[i].visible = false;
            }

            return;
        }

        __modal.$vm.instances[name].visible = false;

        cb = __modal.instances[name].onHide;

        setTimeout(function() {
            if ( ! _visible()) {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        }, 450);

        if (cb) {
            cb(data);
        }
    };

    Modal.prototype.visible = function (name) {
        _init(name);

        return __modal.$vm.instances[name].visible;
    };

    Modal.prototype.option = function (name, key, val) {
        _init(name);
        
        if (!val) {
            return __modal.instances[name][key];
        }

        __modal.instances[name][key] = val;
    };

    return Modal;
}
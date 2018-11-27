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
        if (window.innerHeight) {
            return document.body.offsetHeight > window.innerHeight;
        }
        
        return (
            (document.documentElement.scrollHeight > document.documentElement.offsetHeight) ||
            (document.body.scrollHeight > document.body.offsetHeight)
        );
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

        document.body.className += ' modal-show';

        if (_hasScrollbar()) {
            document.body.className += ' modal-show-scroll';
        }
        
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
        var i, cb,
            timer = null;        

        _init(name);
        
        if (!name) {
            for (i in __modal.$vm.instances) {
                __modal.$vm.instances[i].visible = false;
            }

            return;
        }

        __modal.$vm.instances[name].visible = false;

        cb = __modal.instances[name].onHide;

        timer = setTimeout(function() {
            if ( ! _visible()) {
                __modal.unload();
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

    Modal.prototype.unload = function () {
        document.body.className = document.body.className.replace(' modal-show-scroll', '');
        document.body.className = document.body.className.replace(' modal-show', '');
    };

    return Modal;
}
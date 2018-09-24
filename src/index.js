var Modal = require('./modal.js')();

function plugin(Vue, options) {
    var modal = new Modal(Vue, options);

    Vue.modal = modal;

    Object.defineProperties(Vue.prototype, {
        $modal: {
            get: function () {
                return modal;
            }
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
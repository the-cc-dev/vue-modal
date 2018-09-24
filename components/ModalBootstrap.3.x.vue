<template>
    <el-dialog
        :name="name"
        :transition="_transitionBg"
        :on-show="onShow"
        :on-hide="onHide"
        :on-dismiss="onDismiss"
    >
        <transition :name="_transition">
            <div
                v-show="$modal.visible(name)"
                v-bind:class="[_theme]"
                class="modal-dialog"
            >
                <div class="modal-content">
                    <div
                        v-if="_showHeader"
                        class="modal-header"
                    >
                        <slot name="header">
                            <button
                                @click.stop="$modal.hide(name)"
                                type="button"
                                class="close"
                            >
                                <span>&times;</span>
                            </button>
                            
                            <h4 class="modal-title">
                                <slot name="title"></slot>
                            </h4>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div
                        v-if="_showFooter"
                        class="modal-footer"
                    >
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </el-dialog>
</template>

<script>
    import elDialog from './Dialog.vue';

    export default {
        props: {
            name: {
                type: String,
                default: null
            },
            
            theme: {
                // type: String || Array
                default: null
            },
            
            onShow: {
                type: Function,
                default: null
            },
            
            onHide: {
                type: Function,
                default: null
            },
            
            onDismiss: {
                type: Function,
                default: null
            },
            
            transition: {
                type: String,
                default: null
            },
            
            transitionBg: {
                type: String,
                default: null
            }
        },

        computed: {
            _showHeader() {
                return this.$slots.header || this.$slots.title;
            },

            _showFooter() {
                return this.$slots.footer;
            },

            _theme() {
                return this.theme ? ('modal-' + ((this.theme.constructor !== Array ? [this.theme] : this.theme).join(' modal-'))) : '';
            },

            _transition() {
                return this.transition || this.$modal.option(this.name, 'transition');
            },

            _transitionBg() {
                return this.transitionBg || this.$modal.option(this.name, 'transitionBg');
            }
        },

        components: {
            elDialog
        }
    }
</script>


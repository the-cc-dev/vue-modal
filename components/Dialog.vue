<template>
    <div>
        <transition :name="transition">
            <div
                v-show="$modal.visible(name)"
                class="modal-backdrop"
            ></div>
        </transition>

        <transition :name="'modal-none'">
            <div
                v-show="$modal.visible(name)"
                @click.stop="$modal.dismiss(name)"
                class="modal-container"
            >
                <div class="modal-container-table">
                    <div class="modal-container-cell">
                        <div class="modal-container-content">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
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
            }
        },

        created() {
            this.$modal.option(this.name, 'onShow', this.onShow);
            
            this.$modal.option(this.name, 'onHide', this.onHide);
            
            this.$modal.option(this.name, 'onDismiss', this.onDismiss);
        },

        beforeDestroy() {
            this.$modal.unload(this.name);
        }
    }
</script>

<style>
    .modal-backdrop,
    .modal-container {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1050;
    }

    .modal-backdrop {
        background: #333;
        opacity: 0.5;
    }

    .modal-container {
        overflow-y: scroll;
    }

    .modal-container-table {
        display: table;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    .modal-container-cell {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        padding: 20px;
    }

    .modal-container-content {
        position: relative;
        display: inline-block;
        text-align: left;
    }

    /* none */
    .modal-none-enter-active {
        transition: opacity 0.3s ease;
    }
    .modal-none-leave-active {
        transition: opacity 0.5s ease;
    }

    /* fade */
    .modal-fade-enter-active {
        transition: opacity 0.3s ease;
    }
    .modal-fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }

    /* scale */
    .modal-scale-enter-active {
        transition: transform 0.3s ease;
    }
    .modal-scale-leave-active {
        transition: opacity 0.5s ease;
    }
    .modal-scale-enter {
        transform: scale(0.2);
    }
    .modal-scale-leave-to {
        opacity: 0;
    }
</style>
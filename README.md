# Vue Modal

A simple, light weight and intuitive modal control for Vue.js.



## Install

```bash
$ sudo npm install @websanova/vue-modal
``` 

The script is self installing if `Vue` is available.

```javascript
import 'vue';
import '@websanova/vue-modal';

Vue.modal.options.transition = 'modal-scale';
...
```

Otherwise install it manually.

```javascript
import VueModal from '@websanova/vue-modal';
import Vue from `vue`;

Vue.use(VueModal, {
    // options
});
```



## CDN

Available on jsdelivr.

```javascript
<script src="https://cdn.jsdelivr.net/npm/@websanova/vue-modal@0.1.0"></script>
```



## Usage

It's  best to just take a look at the sample components for usage.

* [Dialog](https://github.com/websanova/vue-modal/blob/master/components/Dialog.vue)
* [ModalBootstrap.3.x](https://github.com/websanova/vue-modal/blob/master/components/ModalBootstrap.3.x.vue)

First include the modal component.

```javascript
Vue.use('el-modal', '@websanova/vue-modal/components/ModalBootstrap.3.x.vue');
```

Then create a modal.

```vue
<template>
    <el-modal
        :name="'test-one'"
        :transition="'modal-scale'"
        :on-show="onShow"
    >
        <template slot="body">
            modal body content
        </template>

        <template slot="footer">
            <button
                @click="$modal.hide('test-one')"
            >
                Cancel
            </button>
        </template>
    </el-modal>
</template>

<script>
    export default {
        methods: {
            onShow(data) {
                // do something
            }
        }
    };
</script>
```

Then include and trigger the modal.

```vue
<template>
    <div>
        <button
            @click="$modal.show('test-one')"
        >
            Test One
        </button>

        <modal-test-one></modal-test-one>
    </div>
</template>

<script>
    import ModalTestOne from '/path/to/modal/TestOne.vue';

    export default {
        components: {
            ModalTestOne
        }
    }
</script>
```


## Methods

### `show`

Show the modal.

* It accepts an optional data parameter which will be fed through to the `onShow` method.
* It will hide any currently shown modals in the process of showing itself.

```javascript
$modal.show('modal-name', data);
```

### `hide`

Hide the modal.

* It accepts an optional data parameter which will be fed through to the `onHide` method.

```javascript
$modal.hide('modal-name', data);
```

### `dismiss`

Dismiss the modal.

* It accepts an optional data parameter which will be fed through to the `onDismiss` method.
* Is meant to be triggered on a dismiss like when clicking on the background.
* If no dismiss callback is set it will default to the `onHide` callback if set.

```javascript
$modal.dismiss('modal-name', data);
```

### `visible`

Returns binded property for modal visibility.

* Meant to be used when building out modal components.

```javascript
$modal.visible('modal-name');
```

### `option`

Set options for a modal.

* Meant to be used when building out modal components.

```javascript
$modal.option('modal-name', 'onShow', onShow);
```



## Options

### `onShow`

**Default** `null`

Callback that can be set to trigger when modal shows.

* Useful to reset forms, initialize some data, etc.

### `onHide`

**Default** `null`

Callback that can be set to trigger when modal hides.

* Useful to reset forms, initialize some data, etc.

### `onDismiss`

**Default** `null`

Callback that can be set to trigger when modal dismisses.

* Useful to reset forms, initialize some data, etc.

### `dismissable`

**Default:** `false`

Enable / disable dismissing of modals.

### `transition`

**Default:** `modal-fade`

Set the main transition for modal content.

### `transitionBg`

**Default:** `modal-fade`

Set the main transition for modal background / backdrop.
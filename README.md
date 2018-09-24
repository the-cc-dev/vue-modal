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
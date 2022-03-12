import { createApp } from 'vue'
import App from './App.vue'
import Storage from './libs/Storage'


const store = new Storage()
store.setItem('tiny', {hello: 'world'});

const test = store.getItem('tiny');

console.log(test);


createApp(App).mount('#app')

import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Request from './components/Request.vue';

createApp(Request).use(ElementPlus).mount('#request');


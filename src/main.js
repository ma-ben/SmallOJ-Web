import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './components/router/router.js'
import axios from 'axios';
// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue3-cookies'
// import vue_markdown from 'vue-markdown';

// // markdown highlight
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
});



const app = createApp(App)
app.use(VueCookies)
// app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$api = api;
app.use(ElementPlus)
app.use(router)
// app.use(VueCookies)
// app.use(vue_markdown)
app.mount('#app')

app.directive('highlight', function(el){
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
// createApp(App).mount('#app')
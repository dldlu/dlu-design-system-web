import { createApp } from 'vue'
import './global.css'
import store from './store'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

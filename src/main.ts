import { createApp } from 'vue'
import './global.css'
import store from './stores'
import App from './App.vue'


const app = createApp(App)
app.use(store)

app.mount('#app')

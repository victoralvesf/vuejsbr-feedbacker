import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'

import 'animate.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  closeOnClick: true,
  pauseOnHover: true,
  timeout: 3500
}

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')

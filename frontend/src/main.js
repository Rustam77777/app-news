import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'
import router from './router'
import App from './App.vue'
import { useAuthStore } from '@/stores/auth' // ← add this

import './assets/css/main.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  maxToasts: 3,
  newestOnTop: true
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

// ← add these 3 lines before mount
const authStore = useAuthStore()
await authStore.initializeAuth()

app.mount('#app')
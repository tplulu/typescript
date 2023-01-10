import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"; 
import { createPinia } from "pinia" ; // <Provider>
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueCookies from 'vue-cookies'
const app = createApp(App);
app.use(router) // ajouter une plugin (extension) à notre projet
    app.use(VueCookies, { expires: '1h'})
    .use(createPinia()) // comme un Provider 
    app.use(VueSweetalert2)
    .mount('#app')
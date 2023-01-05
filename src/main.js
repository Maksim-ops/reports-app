import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import components from '@/components/UI';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//import { useToast } from "vue-toastification";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true
}

//const toast = useToast();

app
    .use(store)
    .use(router)
    .use(Toast, options)
    .mount('#app')

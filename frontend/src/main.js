import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue';
import router from './router';
import { VueMasonryPlugin } from 'vue-masonry';

const app = createApp(App);

app.use(VueMasonryPlugin);

const pinia = createPinia();

pinia.use(({ store }) => {
    store.$router = markRaw(router);
});
app.use(autoAnimatePlugin);
app.use(pinia).use(router).mount('#app');

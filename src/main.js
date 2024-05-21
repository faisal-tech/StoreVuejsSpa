import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue'
import router from './router'

// Add icons to the library
library.add(faPenToSquare, faCheck);

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon); // Register FontAwesomeIcon globally

app.mount('#app')

// main.js

import { createApp } from 'vue';
import App from './App.vue';

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(  /* eslint-disable */ reg => console.log('Service Worker: registered'))
            .catch(err => console.error(`Service Worker: Error: ${err}`));
    });
}

createApp(App).mount('#app');

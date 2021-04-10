import { createApp, reactive, toRefs } from 'vue';
import App from './App.vue';
import { updateState } from './state';
import { requestState } from './rstate';

window.addEventListener('message', async (event) => {
    const message = event.data; // json message data from extension
    console.debug(`message: ${JSON.stringify(message, null, 2)}`);
    if (message.type === 'update') {
        console.log("UPDATE");
        const text = message.text?.trim();
        let isNew = false;
        if (!text) {
            // new request suite
            isNew = true;
            // text = await templates.get('default.flow');
        }

        updateState({
            base: message.base,
            file: message.file,
            text,
            readonly: message.readonly
        });
    }
});

console.log("GLOB REQ ST: " + JSON.stringify(requestState));

createApp(App).mount('#app');


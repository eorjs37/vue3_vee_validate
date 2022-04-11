import { createApp } from 'vue'
import App from './App.vue';
import './utils/veevalidate.js';
import { setLocale } from '@vee-validate/i18n';
import { isValidate} from './utils/setnecessary';
import { Form, Field,ErrorMessage  } from 'vee-validate';
setLocale('en');


const app = createApp(App);


//전역함수
app.provide('isValidate',isValidate);

//전역 컴퍼넌트 선언
app.component('Form',Form);
app.component('Field',Field);
app.component('ErrorMessage',ErrorMessage);
app.mount('#app');

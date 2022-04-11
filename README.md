# vue3_vee_validate

## 1. 🚈 vee-validate 설치
```bash
npm install vee-validate --save
npm install @vee-validate/rules
npm install @vee-validate/i18n
```

## 2. 🏞 환경세팅
> 각종 언어에 맞는 names 세팅

**assets/names/ennames.json**  

```json
{
  "names": {
    "name": "Name",
    "age": "Age"
  }
}
```

**assets/names/konames.json**

```json
{
    "names": {
      "name": "이름",
      "age": "나이"
    }
}
```

## 3.⛺ veevalidate.js 작성
**utils/veevalidate.js**

```javascript
import { configure, defineRule} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import ennames from '../assets/names/ennames.json';
import konames from '../assets/names/konames.json';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ko from '@vee-validate/i18n/dist/locale/ko.json';

// Install all rules
Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});


configure({
  generateMessage: localize({
    en: {
      names: ennames.names,
      messages: en.messages,
    },
    ko: {
      names: konames.names,
      messages: ko.messages,
    },
  })
});
```

## 4.🏛 전역 컴퍼넌트 선언
main.js
```javascript
import { createApp } from 'vue'
import App from './App.vue';
import './utils/veevalidate.js';
import { setLocale } from '@vee-validate/i18n';
import { Form, Field,ErrorMessage  } from 'vee-validate';
setLocale('en');


const app = createApp(App);
app.component('Form',Form);
app.component('Field',Field);
app.component('ErrorMessage',ErrorMessage);
app.mount('#app');
```


## 5. ⚡ 사용법

App.vue

```html javascript
<template>
  <div class="mx-1200">

    <Field id="name" name="name" label="name" rules="required"  v-slot="{ field ,errors }">
      <div class="dp_block">
        <label for="name">이름 : </label>
        <input type="text" id="name" v-bind="field" v-model="input" :class="{'input_invaild' : errors[0]}">
      </div>
      
      <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
    </Field>  

     <Field id="age" name="age" label="age"  rules="required"  v-slot="{ field ,errors }">
       <div class="dp_block">
         <label for="age">나이 : </label>
         <input type="number" min="0" id="age" v-bind="field" v-model="input2" :class="{'input_invaild' : errors[0]}">
       </div>
      <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
    </Field>  
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup(){
    const input = ref('');
    const input2 = ref('');
    const submit = () =>{

    }

    return{
      input,
      input2,
      submit
    }
  },
}
</script>

<style>
.mx-1200{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.dp_block{
  display: block;
}

.input_invaild{
  border: 1px solid red;
}

.invaild{
  display: block;
  color: red;
}
</style>

```

## 6. 🌊 필수값만 체크

### 1. 필수값 리스트 작성 necessaryItems 및 선언
```javascript
setup(){
  const necessaryItems = ref(['name','age']);
}
```

### 2. 전역함수 선언 inject('isValidate');
```javascript
setup(){
  const isValidate = inject('isValidate');
}
```

### 3. 저장함수(onSubmit)에서 const { results } =  await form1.value.validate(); 체크
```javascript
setup(){
    const onSubmit = async () =>{
      const { results } =   await form1.value.validate();
      if(isValidate(necessaryItems.value,results)){
        alert('통과입니다.');
      }else{
        alert('필수값 확인을 해주세요.');
      }
    }
}
```

### 전체 소스 
```html javascript
<template>
  <div class="mx-1200">
    <Form @submit="onSubmit" ref="form1">
       <Field ref="name" id="name" name="name" label="name" rules="required"   v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="name">이름 : </label>
          <input type="text" id="name" v-bind="field" v-model="input" :class="{'input_invaild' : errors[0]}">
        </div>
        
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

      <Field ref="age" id="age" name="age" label="age"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="age">나이 : </label>
          <input type="number" min="0" id="age" v-bind="field" v-model="input2" :class="{'input_invaild' : errors[0]}">
        </div>
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

       <Field ref="country" id="country" name="country" label="country"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="country">국적 : </label>
          <input type="text" id="country" v-bind="field" v-model="input3" :class="{'input_invaild' : errors[0]}">
        </div>
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  
    </Form>
  
    <button @click="onSubmit">submit</button>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
export default {
  name: 'App',
  setup(){
    const input = ref('');
    const input2 = ref(0);
    const input3 = ref('country');
    const form1 = ref(null); //ref="form1"
    const isValidate = inject('isValidate');
    const necessaryItems = ref(['name','age']);

    const onSubmit = async () =>{
      const { results } =   await form1.value.validate();
      if(isValidate(necessaryItems.value,results)){
        alert('통과입니다.');
      }else{
        alert('필수값 확인을 해주세요.');
      }
    }


    onMounted(() =>{
    })

    return{
      input,
      input2,
      input3,
      form1,
      onSubmit
    }
  },
}
</script>

<style>
.mx-1200{
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.dp_block{
  display: block;
}

.input_invaild{
  border: 1px solid red;
}

.invaild{
  display: block;
  color: red;
}
</style>
```
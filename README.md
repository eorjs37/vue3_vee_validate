# vue3_vee_validate

## 1. π vee-validate μ€μΉ
```bash
npm install vee-validate --save
npm install @vee-validate/rules
npm install @vee-validate/i18n
```

## 2. π νκ²½μΈν
> κ°μ’ μΈμ΄μ λ§λ names μΈν

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
      "name": "μ΄λ¦",
      "age": "λμ΄"
    }
}
```

## 3.βΊ veevalidate.js μμ±
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

## 4.π μ μ­ μ»΄νΌλνΈ μ μΈ
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


## 5. β‘ μ¬μ©λ²

App.vue

```html javascript
<template>
  <div class="mx-1200">

    <Field id="name" name="name" label="name" rules="required"  v-slot="{ field ,errors }">
      <div class="dp_block">
        <label for="name">μ΄λ¦ : </label>
        <input type="text" id="name" v-bind="field" v-model="input" :class="{'input_invaild' : errors[0]}">
      </div>
      
      <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
    </Field>  

     <Field id="age" name="age" label="age"  rules="required"  v-slot="{ field ,errors }">
       <div class="dp_block">
         <label for="age">λμ΄ : </label>
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

## 6. π νμκ°λ§ μ²΄ν¬

### 1. νμκ° λ¦¬μ€νΈ μμ± necessaryItems λ° μ μΈ
```javascript
setup(){
  const necessaryItems = ref(['name','age']);
}
```

### 2. μ μ­ν¨μ μ μΈ inject('isValidate');
```javascript
setup(){
  const isValidate = inject('isValidate');
}
```

### 3. μ μ₯ν¨μ(onSubmit)μμ const { results } =  await form1.value.validate(); μ²΄ν¬
```javascript
setup(){
    const onSubmit = async () =>{
      const { results } =   await form1.value.validate();
      if(isValidate(necessaryItems.value,results)){
        alert('ν΅κ³Όμλλ€.');
      }else{
        alert('νμκ° νμΈμ ν΄μ£ΌμΈμ.');
      }
    }
}
```

### μ μ²΄ μμ€ 
```html javascript
<template>
  <div class="mx-1200">
    <Form @submit="onSubmit" ref="form1">
       <Field ref="name" id="name" name="name" label="name" rules="required"   v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="name">μ΄λ¦ : </label>
          <input type="text" id="name" v-bind="field" v-model="input" :class="{'input_invaild' : errors[0]}">
        </div>
        
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

      <Field ref="age" id="age" name="age" label="age"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="age">λμ΄ : </label>
          <input type="number" min="0" id="age" v-bind="field" v-model="input2" :class="{'input_invaild' : errors[0]}">
        </div>
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

       <Field ref="country" id="country" name="country" label="country"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="country">κ΅­μ  : </label>
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
        alert('ν΅κ³Όμλλ€.');
      }else{
        alert('νμκ° νμΈμ ν΄μ£ΌμΈμ.');
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
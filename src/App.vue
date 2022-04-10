<template>
  <div class="mx-1200">

    <Field id="name" name="name" label="name" rules="required"  v-slot="{ field ,errors }">
      <label for="name">이름 : </label>
      <input type="text" id="name" v-bind="field" v-model="input" :class="{'input_invaild' : errors[0]}">
      <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
    </Field>  

     <Field id="age" name="age" label="age"  rules="required"  v-slot="{ field ,errors }">
      <label for="age">나이 : </label>
      <input type="number" min="0" id="age" v-bind="field" v-model="input2" :class="{'input_invaild' : errors[0]}">
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

.input_invaild{
  border: 1px solid red;
}

.invaild{
  display: block;
  color: red;
}
</style>

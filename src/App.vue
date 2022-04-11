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

    </Form>
  
    <button @click="onSubmit">submit</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'App',
  setup(){
    const input = ref('');
    const input2 = ref(0);
    const form1 = ref(null); //ref="form1"
    const name = ref(null); //ref="name"

    const onSubmit = async () =>{
     const { valid } =   await form1.value.validateField('name');
     console.log(valid);
    }

    onMounted(() =>{
      console.log(form1.value);
    })

    return{
      input,
      input2,
      form1,
      name,
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

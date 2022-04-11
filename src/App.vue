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

<template>
  <div class="mx-1200">
    <Form @submit="onSubmit" ref="form1">
       <Field ref="name" id="name" v-model="info.input"  name="name" label="name" rules="required"   v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="name">이름 : </label>
          <input type="text" id="name" v-bind="field" :class="{'input_invaild' : errors[0]}">
        </div>
        
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

      <Field ref="age" id="age" name="age" v-model="info.input2" label="age"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="age">나이 : </label>
          <input type="number" min="0" id="age" v-bind="field" :class="{'input_invaild' : errors[0]}">
        </div>
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

       <Field ref="country" id="country" name="country"  v-model="info.input3" label="country"  rules="required"  v-slot="{ field ,errors }">
        <div class="dp_block">
          <label for="country">국적 : </label>
          <input type="text" id="country" v-bind="field"  :class="{'input_invaild' : errors[0]}">
        </div>
        <span :class="{'invaild': errors[0] }">{{ errors[0] }}</span>
      </Field>  

      <div class="dp_block">
        <Form  ref="form2" v-slot="{ values }">
          <Field  name="cb1" type="checkbox" value="체크1"/>체크1

          <Field  name="cb2" type="checkbox" value="체크2"/>체크2

          <Field name="cb3" type="checkbox" value="체크3"/>체크3

          <p>
            {{ values }}
          </p>
        </Form>
      </div>
    </Form>
  
    <button @click="onSubmit">submit</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'App',
  setup(){
    const form1 = ref(null); //ref="form1"
    const form2 = ref(null); //ref="form2"
    const info = ref({
      input:'',
      input2:0,
      input3:'',
      checkBox:[]
    })

    const onSubmit = async () =>{
      console.log(form1.value);
      const { results } =   await form1.value.validate();
      // const { results } = await form2.value.validate();
      
      console.log(results);
    }


    onMounted(() =>{
    })

    return{
      form1,
      form2,
      info,
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

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['onSubmit'])
const error = ref(null)
const emptyFields = ref([])
const todo_form = ref({
  title: '申请奖学金',
  date: '2025-03-04 16:27',
  description: '打印表格、按规定填写',
})

async function handleSubmit() {
  emptyFields.value = [] //clear emptyFields
  const { title, date, description } = todo_form.value

  //valid TodoForm
  if(!title || !description || !date) {
    if (!title) emptyFields.value.push('title')
    if (!date) emptyFields.value.push('date')
    if (!description) emptyFields.value.push('description')
    return
  }

  console.log('valid: ', todo_form.value)

  //emit TodoForm onSubmit event
  emit('onSubmit', {
    ...todo_form.value
  })

  //clean form field
  todo_form.value = { title: '', date: '', description: ''}
}
</script>

<template>
  <form class="create" @submit.prevent="handleSubmit(todo_form)" >
    <h3>添加新的待办事项</h3>

    <label>待办事项:</label>
    <input
        type="text"
        v-model="todo_form.title"
        :class="{ 'error' : emptyFields.includes('title') }"
    />

    <label>时间:</label>
    <input
        type="datetime-local"
        v-model="todo_form.date"
        :class="{ 'error' : emptyFields.includes('date') }"
    />

    <label>详细内容:</label>
    <input
        type="text"
        v-model="todo_form.description"
        :class="{ 'error' : emptyFields.includes('description') }"
    />

    <button>添加</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<style scoped>
form {
  margin: 40px;
}
label, input {
  display: block;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  background: var(--primary);
  border: 0;
  color: #fff;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 4px;
  cursor: pointer;
}
div.error {
  padding: 10px;
  background: #ffefef;
  border: 1px solid var(--error);
  color: var(--error);
  border-radius: 4px;
  margin: 20px 0;
}
input.error {
  border: 1px solid var(--error);
}

</style>
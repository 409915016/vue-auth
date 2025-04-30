<script setup>
import { ref, defineEmits, defineProps } from 'vue'
const { disabled } = defineProps(['disabled'])
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

    <button :disabled="disabled">{{ disabled ? '添加中...' : '添加' }}</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<style scoped>


</style>
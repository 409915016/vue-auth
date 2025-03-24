<script setup>
import { ref } from 'vue'
const title = ref('')
const load = ref('')
const reps = ref('')
const error = ref(null)
const emptyFields = ref([])
const todo_form = ref({
  title: '申请奖学金',
  date: '2025-03-04 16:27',
  description: '打印表格、按规定填写',
  createdAt: '',
})
function getFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function handleSubmit() {
  const { title, date, description } = todo_form.value
  emptyFields.value = [] //clear emptyFields
  if (!title) emptyFields.value.push('title')
  if (!date) emptyFields.value.push('date')
  if (!description) emptyFields.value.push('description')
  todo_form.value.createdAt = getFormattedDate()
  console.log('valid: ', todo_form.value)

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
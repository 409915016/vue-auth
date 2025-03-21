<script setup>
import { ref } from 'vue'
const title = ref('')
const load = ref('')
const reps = ref('')
const error = ref(null)
const emptyFields = ref([])

async function handleSubmit() {
  // if(!user) {
  //   setError('You muse be logged in')
  //   return
  // }
  const user = { token: '123'}

  const workout = {title: title.value, load: load.value, reps: reps.value}

  const response = await fetch('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(workout),
    headers: {
      'Content-Type': 'application/json',
      'Authrization': 'Bearer ' + user.token
    }
  })
  const json = await response.json().catch(err => console.log(err))

  if (!response.ok) {
    if(response.status === 404) { return error.value = 'network err'}
    error.value = json.error
    emptyFields.value = json.emptyFields
  }
  if (response.ok) {
    title.value = ''
    load.value = ''
    reps.value = ''
    error.value = null
    emptyFields.value = []
    console.log('new workout added', json)
    //dispatch({type: 'CREATE_WORKOUT', payload: json})
  }
}
</script>

<template>
  <form class="create" @submit.prevent="handleSubmit" >
    <h3>添加新的待办事项</h3>

    <label>待办事项:</label>
    <input
        type="text"
        v-model="title"
        :class="{ 'error' : emptyFields.includes('title') }"
    />

    <label>时间:</label>
    <input
        type="datetime-local"
        v-model="load"
        :class="{ 'error' : emptyFields.includes('load') }"
    />

    <label>详细内容:</label>
    <input
        type="text"
        v-model="reps"
        :class="{ 'error' : emptyFields.includes('reps') }"
    />

    <button>添加</button>

    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<style scoped>

</style>
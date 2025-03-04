<script setup>
  defineProps(['workout'])
  import formatDistanceToNow from 'date-fns/formatDistanceToNow'
  async function handleClick() {
    //const { user } = useAuthContext()
    // if(!user) {
    //   return
    // }
    const user = { token: '123'}
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authrization': 'Bearer ' + user.token
      },
    })
    const json = await response.json()
    if(response.status === 404) { return }
    if (response.ok) {
      //dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
</script>

<template>
  <div class="workout-details">
    <h4>{{ workout.title }}</h4>
    <p><strong>Load (kg): </strong>{{ workout.load }}</p>
    <p><strong>Reps: </strong>{{ workout.reps }}</p>
    <p>{{ formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true }) }}</p>
    <span class="material-symbols-outlined" @click="handleClick">delete</span>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {reactive} from "vue";
import WorkoutForm from '@/components/WorkoutForm.vue'
import WorkoutDetails from '@/components/WorkoutDetails.vue'

const workouts = reactive([
  { _id: 1, title: '1', load: '1', reps: '1', createdAt: '2025-03-04 16:27:47'}
])
</script>

<template>
  <div class="home">
    <div class="workouts">
      <WorkoutDetails v-for="workout in workouts"
                      :key="workout._id"
                      :workout="workout"
      />
    </div>
    <WorkoutForm />
  </div>
</template>

<style scoped>

</style>
<template>
  <button
    class="rounded-md px-2 py-1 text-sm border-2 border-gray-200 bg-gray-50 ring-offset-2 active:ring-1 active:ring-gray-500"
    @click="count++"
  >
    Clicked {{ count }} times
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

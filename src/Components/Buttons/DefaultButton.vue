<template>
  <button
    :role
    class="cursor-pointer inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 -:text-white -:bg-indigo-600 -:hover:bg-indigo-500 -:focus-visible:outline-indigo-600"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue';
import { defineProps } from 'vue';

export interface DefaultButtonProps {
  role?: string;
}

withDefaults(defineProps<DefaultButtonProps>(), {
  role: 'button',
});
</script>

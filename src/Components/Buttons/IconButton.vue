<template>
  <button
    :role
    class="cursor-pointer inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 -:text-white -:bg-indigo-600 -:hover:bg-indigo-500 -:focus-visible:outline-indigo-600"
  >
    <FontAwesomeIcon v-bind="icon" aria-hidden="true" class="-ml-0.5 h-5 w-5" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

export interface IconButtonProps {
  icon: FontAwesomeIconProps;
  role?: string;
}

withDefaults(defineProps<IconButtonProps>(), {
  role: 'button',
});
</script>

<template>
  <FontAwesomeIcon
    class="-:text-gray-700 -:font-semibold -:text-xs ring-2 rounded-full aspect-square -:p-1"
    v-bind="icon"
  />
</template>

<script setup lang="ts">
import { IconProps } from '@/types/IconProps';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export interface CircleIconProps {
  icon: IconProps;
}

defineProps<CircleIconProps>();
</script>

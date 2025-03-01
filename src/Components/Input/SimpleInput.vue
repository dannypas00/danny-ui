<template>
  <div>
    <label
      v-if="label"
      :for="identifier"
      class="relative block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="absolute top-0 text-sm text-red-500">*</span>
    </label>

    <div class="mt-1">
      <div class="relative flex items-center gap-2">
        <div
          :class="{ 'ring-red-500': error && !warning, 'ring-yellow-400': warning }"
          class="-5:bg-white w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand flex items-center"
        >
          <input
            :id="identifier"
            v-model="value"
            :aria-invalid="error ? 'true' : 'false'"
            :autocomplete
            :name="identifier"
            :required
            :type
            class="text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-full focus:outline-none"
          />

          <FontAwesomeIcon
            v-if="warning && !error"
            :title="warning"
            class="text-yellow-400 aspect-square"
            icon="exclamation-triangle"
            size="lg"
          />

          <CircleIcon
            v-if="explanation && !warning"
            :icon="{ icon: 'info' }"
            :title="explanation"
            class="text-blue-700"
          />

          <FontAwesomeIcon
            v-if="error"
            :title="error"
            class="text-red-500 aspect-square -mr-2"
            icon="exclamation"
            size="lg"
          />
        </div>
      </div>

      <span v-if="error" class="text-sm text-red-500">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleIcon from '@/Components/Icons/CircleIcon.vue';
import type { IconProps } from '@/types/IconProps';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { type InputTypeHTMLAttribute, computed } from 'vue';

export interface SimpleInputProps {
  label?: string;
  identifier?: string;
  type?: InputTypeHTMLAttribute;
  autocomplete?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  warning?: string;
  explanation?: string;
  icon?: IconProps;
}

withDefaults(defineProps<SimpleInputProps>(), {
  label: undefined,
  type: 'text',
  autocomplete: 'off',
  required: false,
  error: undefined,
  placeholder: undefined,
  warning: undefined,
  explanation: undefined,
  icon: undefined,
  identifier: () => Math.random().toString(16).slice(32),
});

const modelValue = defineModel({ type: String, required: true });

const value = computed({
  get: () => modelValue.value,
  set: (newValue: string) => {
    modelValue.value = newValue;
  },
});
</script>

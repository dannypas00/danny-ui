<template>
  <div>
    <label
      :for="identifier"
      class="relative block text-sm font-medium leading-6 text-gray-900"
      v-if="label"
    >
      {{ label }}
      <span v-if="required" class="absolute top-0 text-sm text-red-500">*</span>
    </label>

    <div class="mt-1">
      <div class="relative flex items-center gap-2">
        <div
          class="-5:bg-white w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand flex items-center"
          :class="{ 'ring-red-500': error && !warning, 'ring-yellow-400': warning }"
        >
          <input
            :id="identifier"
            v-model="value"
            class="text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-full focus:outline-none"
            :name="identifier"
            :type
            :autocomplete
            :required
            :aria-invalid="error ? 'true' : 'false'"
          />

          <FontAwesomeIcon
            v-if="warning && !error"
            size="lg"
            class="text-yellow-400 aspect-square"
            icon="exclamation-triangle"
            :title="warning"
          />

          <CircleIcon
            v-if="explanation && !warning"
            class="text-blue-700"
            :icon="{ icon: 'info' }"
            :title="explanation"
          />

          <FontAwesomeIcon
            v-if="error"
            size="lg"
            class="text-red-500 aspect-square -mr-2"
            icon="exclamation"
            :title="error"
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
import { type IconProps } from '@/types/IconProps';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, type InputTypeHTMLAttribute } from 'vue';

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
  type: 'text',
  autocomplete: 'off',
  required: false,
  identifier: () => Math.random().toString(16).slice(32),
});

const modelValue = defineModel({ required: true });

const value = computed({
  get: () => modelValue.value,
  set: (newValue: string) => {
    modelValue.value = newValue;
  },
});
</script>

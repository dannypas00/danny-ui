<template>
  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 backdrop-blur-[2px] transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-screen sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="sm:flex sm:items-start">
                <div
                  v-if="icon"
                  class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-blue-700 sm:mx-0 sm:size-10"
                >
                  <FontAwesomeIcon size="xl" v-bind="icon" />
                </div>

                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                    {{ title }}
                  </DialogTitle>

                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      <slot />
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 w-full flex flex-row-reverse">
                <slot v-if="$slots.footer" name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { IconProps } from '@/types/IconProps';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

export interface ModalDialogProps {
  title: string;
  icon?: IconProps;
}

withDefaults(defineProps<ModalDialogProps>(), {
  icon: undefined,
});

const open = defineModel('open', {
  type: Boolean,
  required: true,
});

function closeModal(arg) {
  open.value = arg;
}
</script>

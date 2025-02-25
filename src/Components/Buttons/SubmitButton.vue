<template>
  <button
    type="submit"
    class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="$attrs.class ?? 'text-white bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-600'"
  >
    <slot />
  </button>
</template>

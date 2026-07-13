<script setup lang="ts" generic="T extends string | number">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const model = defineModel<T>()
</script>

<template>
  <input
    v-model="model"
    data-slot="input"
    :class="[
      'h-11 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400',
      'focus:border-teal-600 focus:ring-2 focus:ring-teal-100',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-red-500 aria-invalid:ring-red-100',
      props.class,
    ]"
  />
</template>

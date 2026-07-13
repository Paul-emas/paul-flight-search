<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <label
    :class="[
      'text-[0.8rem] font-medium leading-none text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1!',
      props.class,
    ]"
  >
    <slot />
  </label>
</template>

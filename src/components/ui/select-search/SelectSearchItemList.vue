<script setup lang="ts" generic="T extends object">
interface Props {
  items: T[]
  itemKey: (item: T) => string
  displayText: (item: T) => string
}

defineProps<Props>()

const emit = defineEmits<{ select: [item: T] }>()
</script>

<template>
  <div
    v-for="(item, idx) in items"
    :key="itemKey(item)"
    role="button"
    class="cursor-pointer"
    @click="emit('select', item)"
  >
    <slot :record="item" :idx="idx">
      <p
        class="flex h-12 items-center border-b border-slate-100 px-4 text-sm font-medium text-slate-900 last:border-b-0 hover:bg-slate-50"
      >
        {{ displayText(item) }}
      </p>
    </slot>
  </div>
</template>

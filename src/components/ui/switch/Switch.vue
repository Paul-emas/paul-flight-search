<script setup lang="ts">
import { computed, useId, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

interface Props {
  id?: string
  label?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: '',
  disabled: false,
  class: '',
})

const model = defineModel<boolean>({ default: false })

const generatedId = useId()
const switchId = computed(() => props.id ?? generatedId)

function toggle() {
  if (props.disabled) return
  model.value = !model.value
}
</script>

<template>
  <div :class="cn('inline-flex items-center gap-1.5', props.class)">
    <label
      v-if="label || $slots.label"
      :for="switchId"
      class="cursor-pointer text-[0.8rem] leading-none font-medium text-slate-500"
      :class="{ 'cursor-not-allowed opacity-50': disabled }"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>

    <button
      :id="switchId"
      type="button"
      role="switch"
      v-bind="$attrs"
      :aria-checked="model"
      :disabled="disabled"
      class="relative h-4.5 w-8 shrink-0 cursor-pointer rounded-full outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#1a6b5a]/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      :class="model ? 'bg-[#1a6b5a]' : 'bg-slate-300'"
      @click="toggle"
    >
      <span
        class="absolute top-0.5 left-0.5 block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200"
        :class="{ 'translate-x-3.5': model }"
      />
    </button>
  </div>
</template>

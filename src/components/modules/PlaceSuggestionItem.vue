<script setup lang="ts">
import { computed } from 'vue'
import { Building2Icon, PlaneIcon } from 'lucide-vue-next'
import type { PlaceSuggestion } from '@/types'

const props = defineProps<{
  place: PlaceSuggestion
}>()

const subtitle = computed(() => {
  if (props.place.type === 'city')
    return ['All airports', props.place.countryName].filter(Boolean).join(' · ')
  return [props.place.cityName, props.place.countryName].filter(Boolean).join(', ')
})
</script>

<template>
  <div
    class="flex items-center gap-3 border-b border-slate-100 px-3.5 py-2.5 transition-colors duration-150 last:border-b-0 hover:bg-[#f0f7f4]"
  >
    <span
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
      :class="place.type === 'city' ? 'bg-[#e6f5f1] text-[#1a6b5a]' : 'bg-slate-100 text-slate-500'"
    >
      <Building2Icon v-if="place.type === 'city'" class="h-4 w-4" />
      <PlaneIcon v-else class="h-4 w-4" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate text-sm font-medium text-slate-800">
        {{ place.name }}
      </span>
      <span class="block truncate text-xs text-slate-400">
        {{ subtitle }}
      </span>
    </span>
    <span
      class="shrink-0 rounded-md bg-slate-100 px-2 py-1 font-mono text-[0.7rem] font-semibold tracking-wide text-slate-600"
    >
      {{ place.iataCode }}
    </span>
  </div>
</template>

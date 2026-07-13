<script setup lang="ts" generic="T extends object">
import { computed, ref, useId, watch, type Directive } from 'vue'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import SelectSearchItemList from './SelectSearchItemList.vue'

type StringKey = Extract<keyof T, string>

interface Props {
  items: T[]
  itemLabel: StringKey
  itemKey: StringKey
  label?: string
  searchOn?: StringKey[]
  groupBy?: StringKey
  id?: string
  disabled?: boolean
  placeholder?: string
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  noLocalSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  searchOn: undefined,
  groupBy: undefined,
  id: undefined,
  disabled: false,
  placeholder: '',
  isLoading: false,
  hasError: false,
  errorMessage: '',
  noLocalSearch: false,
})

const model = defineModel<T>()
const searchTerm = defineModel<string>('searchTerm', { default: '' })
const showOptions = ref(false)

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)

let onDocumentPointerDown: ((event: PointerEvent) => void) | null = null

const vClickOutside: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    onDocumentPointerDown = (event) => {
      if (!el.contains(event.target as Node)) binding.value()
    }
    document.addEventListener('pointerdown', onDocumentPointerDown)
  },
  unmounted() {
    if (onDocumentPointerDown) document.removeEventListener('pointerdown', onDocumentPointerDown)
    onDocumentPointerDown = null
  },
}

function getDisplayText(item: T): string {
  return String(item[props.itemLabel])
}

function getItemKeyValue(item: T): string {
  return JSON.stringify(item[props.itemKey])
}

function handleClick(item: T) {
  model.value = item
  showOptions.value = false
}

watch(
  () => model.value,
  (value) => {
    if (!value) return
    searchTerm.value = getDisplayText(value)
    showOptions.value = false
  },
  { immediate: true },
)

function handleFocus() {
  if (props.disabled) return
  searchTerm.value = ''
  showOptions.value = true
}

function handleClickOutside() {
  if (model.value) searchTerm.value = getDisplayText(model.value)
  showOptions.value = false
}

const searchKeys = computed(() => props.searchOn ?? [props.itemLabel])

const computedItems = computed(() => {
  if (props.noLocalSearch || searchTerm.value.trim() === '') return props.items

  const query = searchTerm.value.toLowerCase()
  return props.items.filter((item) =>
    searchKeys.value.some((key) =>
      String(item[key] ?? '')
        .toLowerCase()
        .includes(query),
    ),
  )
})

const groupedItems = computed(() => {
  const groupKey = props.groupBy
  if (!groupKey) return null

  const groups: Record<string, T[]> = {}
  for (const item of computedItems.value) {
    const key = String(item[groupKey] ?? 'Uncategorised')
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  }
  return groups
})

const showEmpty = computed(() => !props.isLoading && computedItems.value.length < 1)
</script>

<template>
  <div
    v-click-outside="handleClickOutside"
    class="w-full flex flex-col"
    :class="{ 'opacity-50': disabled }"
  >
    <Label v-if="label" :for="inputId" class="mb-2 block" :class="{ 'text-red-600': hasError }">
      <slot name="label">
        {{ label }}
      </slot>
    </Label>

    <div class="relative">
      <div
        class="flex h-12 items-center gap-2 rounded-[10px] border bg-white px-4 focus-within:border-[#1a6b5a] focus-within:ring-2 focus-within:ring-[#1a6b5a]/12"
        :class="hasError ? 'border-red-500' : 'border-[#e8ecef]'"
        @click="handleFocus"
      >
        <slot name="leftContent" />
        <input
          :id="inputId"
          v-model="searchTerm"
          :disabled="disabled"
          type="text"
          autocomplete="off"
          spellcheck="false"
          class="h-full w-full flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 truncate"
          :placeholder="model ? getDisplayText(model) : placeholder"
          :aria-invalid="hasError"
          :aria-describedby="hasError && errorMessage ? `${inputId}-error` : undefined"
          @focus="handleFocus"
          @input="showOptions = true"
        />
        <slot name="rightContent">
          <div class="border-l border-slate-200 pl-2">
            <ChevronDownIcon
              class="h-4 w-4 text-slate-400 transition-transform"
              :class="{ 'rotate-180': showOptions }"
              aria-hidden="true"
            />
          </div>
        </slot>
      </div>

      <div
        v-if="showOptions"
        data-test-id="search-dropdown-container"
        class="absolute left-0 top-full z-20 mt-1 w-full"
      >
        <div
          v-if="!showEmpty"
          class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          <div class="max-h-72 overflow-auto">

            <template v-if="groupBy && groupedItems">
              <div v-for="(groupItems, groupName) in groupedItems" :key="groupName">
                <div
                  class="sticky top-0 border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500 backdrop-blur-sm"
                >
                  {{ groupName }}
                </div>
                <SelectSearchItemList
                  :items="groupItems"
                  :item-key="getItemKeyValue"
                  :display-text="getDisplayText"
                  @select="handleClick"
                >
                  <template v-if="$slots.item" #default="{ record, idx }">
                    <slot name="item" :record="record" :idx="idx" />
                  </template>
                </SelectSearchItemList>
              </div>
            </template>

            <template v-else>
              <SelectSearchItemList
                :items="computedItems"
                :item-key="getItemKeyValue"
                :display-text="getDisplayText"
                @select="handleClick"
              >
                <template v-if="$slots.item" #default="{ record, idx }">
                  <slot name="item" :record="record" :idx="idx" />
                </template>
              </SelectSearchItemList>
            </template>
          </div>
          <slot name="custom-cta" />
        </div>

        <div v-else>
          <slot name="empty" />
        </div>
      </div>
    </div>

    <slot name="error">
      <p
        v-if="hasError && errorMessage"
        :id="`${inputId}-error`"
        class="mt-1.5 text-sm text-red-600"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>

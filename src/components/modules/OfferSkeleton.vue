<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div class="flex w-full flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:gap-4">
      <div class="flex items-center gap-3 md:w-52 md:shrink-0">
        <div class="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-100 md:h-12 md:w-12" />
        <div class="flex-1 space-y-2">
          <div class="h-3.5 w-32 animate-pulse rounded-full bg-slate-100" />
          <div class="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div class="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100 md:hidden" />
      </div>

      <div class="flex flex-1 items-center gap-3 md:mx-auto md:max-w-sm md:gap-4">
        <div class="space-y-2">
          <div class="h-6 w-14 animate-pulse rounded-md bg-slate-100" />
          <div class="h-3 w-8 animate-pulse rounded-full bg-slate-100" />
        </div>

        <div class="flex flex-1 flex-col gap-2 px-1">
          <div class="h-2 w-full animate-pulse rounded-full bg-slate-100" />
          <div class="flex justify-between">
            <div class="h-3 w-10 animate-pulse rounded-full bg-slate-100" />
            <div class="h-3 w-10 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>

        <div class="space-y-2">
          <div class="h-6 w-14 animate-pulse rounded-md bg-slate-100" />
          <div class="h-3 w-8 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 md:w-auto md:justify-end md:border-0 md:pt-0">
        <div class="space-y-2">
          <div class="h-5 w-24 animate-pulse rounded-md bg-slate-100" />
          <div class="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div class="hidden h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100 md:block" />
      </div>
    </div>
  </div>
</template>

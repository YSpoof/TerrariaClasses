<script setup lang="ts">
  import type { PlayerClass } from "@/types.d";
  import TransitionWrapper from "@/components/TransitionWrapper.vue";

  interface Props {
    classes: PlayerClass[];
    selectedPlayerClass: number;
  }

  interface Emits {
    (e: "update:selectedPlayerClass", value: number): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<template>
  <div
    class="bg-base-200 border-b lg:border-b-0 lg:border-r border-base-300 p-4 overflow-auto lg:w-44 lg:overflow-y-auto">
    <div class="text-xs font-bold text-base-content/60 mb-4 text-center">
      CLASSES
    </div>
    <div
      class="flex lg:flex-col gap-2 lg:space-y-2 lg:gap-0 overflow-x-auto lg:overflow-x-visible">
      <TransitionWrapper
        group
        type="flip"
        tag="div"
        class="flex lg:flex-col gap-2 lg:space-y-2 lg:gap-0 w-full"
        appear>
        <button
          v-for="(playerClass, index) in classes"
          :key="index"
          @click="emit('update:selectedPlayerClass', index)"
          :style="{ '--delay': `${index * 50}ms` }"
          :class="[
            'btn text-xs uppercase flex-shrink-0 lg:btn-block transition-all duration-200',
            selectedPlayerClass === index
              ? 'btn-primary'
              : 'btn-ghost btn-outline hover:scale-105',
          ]">
          {{ playerClass.class }}
        </button>
      </TransitionWrapper>
    </div>
  </div>
</template>

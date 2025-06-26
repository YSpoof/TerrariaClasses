<script setup lang="ts">
  import type { GameStage } from "@/types.d";
  import TransitionWrapper from "@/components/TransitionWrapper.vue";

  interface Props {
    gameStages: GameStage[];
    selectedGameStage: number;
    baseIconUrl: string;
  }

  interface Emits {
    (e: "update:selectedGameStage", value: number): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<template>
  <div class="bg-base-200 border-b border-base-300 p-2">
    <div class="text-xs font-bold text-base-content/60 mb-4 text-center">
      STAGE
    </div>
    <div class="flex justify-center">
      <TransitionWrapper
        group
        type="slide"
        tag="ul"
        class="steps gap-4"
        appear>
        <li
          v-for="(stage, index) in gameStages"
          :key="index"
          :style="{ '--delay': `${index * 100}ms` }"
          :class="[
            'step cursor-pointer transition-all duration-200',
            selectedGameStage === index ? 'step-primary' : '',
            selectedGameStage > index ? 'step-primary' : '',
          ]"
          @click="emit('update:selectedGameStage', index)"
          :data-content="selectedGameStage >= index ? '✓' : ''">
          <div class="flex flex-col items-center">
            <div
              class="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-2"
              :class="[
                selectedGameStage === index
                  ? 'border-primary bg-primary/20'
                  : selectedGameStage > index
                  ? 'border-primary bg-primary/10'
                  : 'border-base-300 hover:border-base-content/40',
              ]">
              <img
                :src="baseIconUrl + stage.icon"
                :alt="`Icon for ${stage.title}`"
                :title="stage.title"
                class="w-8 h-8 object-contain"
                style="image-rendering: pixelated" />
            </div>
          </div>
        </li>
      </TransitionWrapper>
    </div>
    <div class="mt-4 text-center">
      <Transition
        name="stage-title"
        mode="out-in">
        <h1
          :key="selectedGameStage"
          class="text-xl md:text-2xl font-bold text-base-content truncate max-w-full">
          {{ gameStages[selectedGameStage]?.title }}
        </h1>
      </Transition>
    </div>
  </div>
</template>

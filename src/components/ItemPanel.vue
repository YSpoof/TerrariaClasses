<script setup lang="ts">
  import type { Weapon, Accessory, BuffsPotionsAmmo } from "@/types.d";
  import TransitionWrapper from "@/components/TransitionWrapper.vue";

  interface Props {
    title: string;
    items: Weapon[] | Accessory[] | BuffsPotionsAmmo[];
    baseIconUrl: string;
  }
  defineProps<Props>();
</script>

<template>
  <div class="card bg-base-200 shadow-lg overflow-y-auto">
    <div class="card-body p-3 overflow-auto">
      <h3
        class="card-title text-base font-bold mb-2 text-base-content border-b border-base-300 pb-1">
        {{ title }}
      </h3>
      <div
        class="flex-1 flex flex-nowrap sm:flex-wrap gap-4 overflow-auto items-center">
        <TransitionWrapper
          group
          type="scale"
          tag="div"
          class="flex flex-nowrap overflow-x-auto sm:flex-wrap gap-4 w-full"
          appear>
          <div
            v-for="(item, index) in items"
            :key="item.name"
            :style="{ '--delay': `${index * 50}ms` }"
            class="flex flex-col items-center mx-auto">
            <a
              :href="item.link"
              target="_blank"
              class="block w-22 h-22 hover:scale-110 transition-all duration-200 rounded-lg hover:bg-base-300/20 hover:shadow-lg">
              <img
                :src="baseIconUrl + item.icon"
                :alt="item.name"
                :title="item.name"
                class="w-full h-full rounded-lg bg-base-300 p-2 object-contain transition-all duration-200"
                style="image-rendering: pixelated" />
            </a>
            <p
              class="text-base-content/60 mt-1 text-center truncate max-w-22 text-xs">
              {{ item.name }}
            </p>
          </div>
        </TransitionWrapper>
      </div>
    </div>
  </div>
</template>

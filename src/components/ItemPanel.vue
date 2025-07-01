<script setup lang="ts">
  import type {
    Weapon,
    Accessory,
    BuffsPotionsAmmo,
    Attributes,
  } from "@/types.d";
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
          class="flex flex-nowrap overflow-x-auto sm:flex-wrap gap-4 w-full p-4"
          appear>
          <div
            v-for="(item, index) in items"
            :key="item.name"
            :style="{ '--delay': `${index * 50}ms` }"
            class="flex flex-col items-center hover:scale-105 transition-all">
            <a
              :href="item.link"
              target="_blank"
              class="card bg-base-100 shadow hover:shadow-lg transition-shadow p-4 hover:bg-base-200 relative">
              <img
                :src="baseIconUrl + item.icon"
                :alt="item.name"
                :title="item.name"
                class="w-12 h-12 object-contain mb-2 mx-auto"
                style="image-rendering: pixelated" />
              <h4 class="text-xs text-center font-medium w-24 truncate">
                {{ item.name }}
              </h4>
              <div
                v-if="item.attributes && item.attributes.length > 0"
                class="absolute top-1 left-1 flex gap-1">
                <span
                  v-for="attribute in item.attributes"
                  :key="attribute"
                  class="badge badge-xs p-1 w-4 h-4 flex items-center justify-center"
                  :class="{
                    'badge-error': attribute === 'homing',
                    'badge-info': attribute === 'piercing',
                  }"
                  :title="attribute">
                  <span
                    v-if="attribute === 'homing'"
                    class="text-[10px]"
                    >🎯</span
                  >
                  <span
                    v-else-if="attribute === 'piercing'"
                    class="text-[10px]"
                    >☄️</span
                  >
                </span>
              </div>
            </a>
          </div>
        </TransitionWrapper>
      </div>
    </div>
  </div>
</template>

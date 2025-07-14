<script setup lang="ts">
  import { ofetch } from "ofetch";
  import { onMounted, shallowRef, computed, ref } from "vue";
  import type { GameStage } from "@/types";
  import { calamityGameStage, calamityPlayerClass } from "@/stores/settings";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import GameStageSelector from "@/components/GameStageSelector.vue";
  import ClassSelector from "@/components/ClassSelector.vue";
  import ItemPanel from "@/components/ItemPanel.vue";
  import EmptyState from "@/components/EmptyState.vue";

  const data = ref<GameStage[]>([]);
  const isLoading = shallowRef(true);

  const dataFileUrl =
    "https://raw.githubusercontent.com/kokasmark/classamity/refs/heads/main/src/data.json";

  const baseIconUrl = "https://kokasmark.github.io/";

  const loadData = async () => {
    try {
      const response = await ofetch<GameStage[]>(dataFileUrl, {
        parseResponse: JSON.parse,
      });
      data.value = response;
    } catch (error: any) {
      alert(error.data || "Failed to load data");
      console.error("Failed to load data:", error);
      throw error;
    }
  };

  const currentGameStage = computed(() => data.value[calamityGameStage.value]);
  const currentPlayerClass = computed(
    () => currentGameStage.value?.classes[calamityPlayerClass.value]
  );

  onMounted(async () => {
    await loadData();
    isLoading.value = false;
  });
</script>

<template>
  <main class="min-h-screen bg-base-100 text-base-content flex">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="loading-container">
      <LoadingSpinner />
    </div>

    <!-- Main Layout -->
    <div
      v-else
      class="flex flex-col w-full min-h-screen lg:h-screen main-layout">
      <!-- Top Header - Game Stage -->
      <GameStageSelector
        :game-stages="data"
        :selected-game-stage="calamityGameStage"
        :base-icon-url="baseIconUrl"
        @update:selected-game-stage="calamityGameStage = $event" />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        <!-- Player Class Selection -->
        <div
          class="class-selector-container"
          :key="calamityGameStage">
          <ClassSelector
            v-if="currentGameStage?.classes"
            :classes="currentGameStage.classes"
            :selected-player-class="calamityPlayerClass"
            @update:selected-player-class="calamityPlayerClass = $event" />
        </div>

        <!-- Content Layout -->
        <div
          class="content-container h-full w-full"
          :key="`${calamityGameStage}-${calamityPlayerClass}`">
          <div
            v-if="currentPlayerClass"
            class="h-full flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:overflow-hidden bg-base-100">
            <!-- Left Column - Armors and Weapons -->
            <div
              class="flex flex-col gap-4 flex-1 lg:flex-[3] lg:overflow-hidden">
              <!-- Armors Display -->
              <ItemPanel
                v-if="currentPlayerClass.armor.length"
                title="Armors"
                transition-type="bounce"
                :items="currentPlayerClass.armor"
                :base-icon-url="baseIconUrl"
                class="flex-1" />

              <!-- Weapons -->
              <ItemPanel
                v-if="currentPlayerClass.weapons.length"
                title="Weapons"
                transition-type="flip"
                :items="currentPlayerClass.weapons"
                :base-icon-url="baseIconUrl"
                class="flex-1" />
            </div>

            <!-- Right Column - Accessories and Potions -->
            <div
              class="flex flex-col gap-4 flex-1 lg:flex-[2] lg:overflow-hidden">
              <!-- Accessories -->
              <ItemPanel
                v-if="currentPlayerClass.accessories.length"
                title="Accessories"
                transition-type="scale"
                :items="currentPlayerClass.accessories"
                :base-icon-url="baseIconUrl"
                class="flex-1" />

              <!-- Potions / Food / Ammo -->
              <ItemPanel
                v-if="currentPlayerClass.buffsPotionsAmmo.length"
                title="Potions / Food / Ammo"
                transition-type="fade"
                :items="currentPlayerClass.buffsPotionsAmmo"
                :base-icon-url="baseIconUrl"
                class="flex-1" />
            </div>
          </div>

          <!-- No Class Selected State -->
          <EmptyState v-else />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { data, loadData, baseIconUrl } from "@/data";
  import { onMounted, shallowRef, computed } from "vue";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import GameStageSelector from "@/components/GameStageSelector.vue";
  import ClassSelector from "@/components/ClassSelector.vue";
  import ItemPanel from "@/components/ItemPanel.vue";
  import EmptyState from "@/components/EmptyState.vue";

  const isLoading = shallowRef(true);
  const selectedGameStage = shallowRef(0);
  const selectedPlayerClass = shallowRef(0);

  const currentGameStage = computed(() => data.value[selectedGameStage.value]);
  const currentPlayerClass = computed(
    () => currentGameStage.value?.classes[selectedPlayerClass.value]
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
        :selected-game-stage="selectedGameStage"
        :base-icon-url="baseIconUrl"
        @update:selected-game-stage="selectedGameStage = $event" />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        <!-- Player Class Selection -->
        <div
          class="class-selector-container"
          :key="selectedGameStage">
          <ClassSelector
            v-if="currentGameStage?.classes"
            :classes="currentGameStage.classes"
            :selected-player-class="selectedPlayerClass"
            @update:selected-player-class="selectedPlayerClass = $event" />
        </div>

        <!-- Content Layout -->
        <div
          class="content-container h-full w-full"
          :key="`${selectedGameStage}-${selectedPlayerClass}`">
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
                :items="currentPlayerClass.armor"
                :base-icon-url="baseIconUrl"
                class="flex-1" />

              <!-- Weapons -->
              <ItemPanel
                v-if="currentPlayerClass.weapons.length"
                title="Weapons"
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
                :items="currentPlayerClass.accessories"
                :base-icon-url="baseIconUrl"
                class="flex-1" />

              <!-- Potions / Food / Ammo -->
              <ItemPanel
                v-if="currentPlayerClass.buffsPotionsAmmo.length"
                title="Potions / Food / Ammo"
                :items="currentPlayerClass.buffsPotionsAmmo"
                :base-icon-url="baseIconUrl"
                class="flex-1" />
            </div>
          </div>

          <!-- No Class Selected State -->
          <EmptyState v-else />
        </div>
      </div>

      <!-- Footer -->
      <footer
        class="footer footer-center p-6 bg-base-200 text-base-content border-t border-base-300">
        <div class="text-center">
          <p class="text-sm">
            This website was heavily inspired by the work of
            <a
              href="https://github.com/kokasmark"
              target="_blank"
              class="link link-primary font-medium hover:link-hover"
              >@kokasmark</a
            >, you can find the original project
            <a
              href="https://kokasmark.github.io/classamity/"
              target="_blank"
              class="link link-primary font-medium hover:link-hover"
              >here</a
            >.
          </p>
        </div>
      </footer>
    </div>
  </main>
</template>

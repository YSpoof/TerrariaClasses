<script setup lang="ts">
  import { RouterView } from "vue-router";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback> Loading... </template>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>

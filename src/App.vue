<script setup lang="ts">
  import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main content area -->
    <main class="flex-1">
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
    </main>

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
</template>

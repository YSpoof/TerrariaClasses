<script setup lang="ts">
  import TransitionWrapper from "@/components/TransitionWrapper.vue";
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <TransitionWrapper
      type="bounce"
      appear>
      <div class="text-center text-base-content/60">
        <div class="avatar placeholder mb-4">
          <div class="bg-base-300 text-base-content rounded-full w-16">
            <svg
              class="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
            </svg>
          </div>
        </div>
        <p class="text-lg">Select a game stage to view the data</p>
      </div>
    </TransitionWrapper>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import TransitionWrapper from "@/components/TransitionWrapper.vue";
  import type { ModOption } from "@/types";

  const mods: ModOption[] = [
    {
      name: "Vanilla",
      route: "/vanilla",
      icon: "/mods/Vanilla.webp",
      description:
        "Experience the original Terraria class builds and equipment recommendations",
      color: "btn-primary",
      available: true,
    },
    {
      name: "Calamity",
      route: "/calamity",
      icon: "/mods/Calamity.webp",
      description:
        "Explore the massive Calamity mod with its unique classes and progression",
      color: "bg-red-600",
      available: true,
    },
    {
      name: "Thorium",
      route: "/thorium",
      icon: "/mods/Thorium.webp",
      description:
        "Discover new classes and equipment with the Thorium mod expansion",
      color: "bg-cyan-600",
      available: true,
    },
  ];
</script>

<template>
  <main class="min-h-screen bg-base-100 text-base-content">
    <!-- Hero Section -->
    <div class="bg-base-200 border-b border-base-300">
      <div class="container mx-auto px-4 py-12 md:py-20">
        <div class="text-center max-w-4xl mx-auto">
          <TransitionWrapper
            type="bounce"
            appear>
            <h1 class="text-4xl md:text-6xl font-bold text-base-content mb-6">
              Terraria Classes
            </h1>
          </TransitionWrapper>

          <TransitionWrapper
            type="fade"
            appear
            :delay="200">
            <p
              class="text-lg md:text-xl text-base-content/70 mb-8 leading-relaxed">
              Your ultimate guide to Terraria class builds, equipment
              recommendations, and progression paths for vanilla and modded
              gameplay
            </p>
          </TransitionWrapper>

          <TransitionWrapper
            type="scale"
            appear
            :delay="400">
            <div class="badge badge-primary badge-lg">
              Choose Your Adventure
            </div>
          </TransitionWrapper>
        </div>
      </div>
    </div>

    <!-- Mod Selection Grid -->
    <div class="container mx-auto px-4 py-12">
      <TransitionWrapper
        group
        type="flip"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        appear>
        <div
          v-for="(mod, index) in mods"
          :key="mod.name"
          :style="{ '--delay': `${(index + 1) * 150}ms` }"
          class="group">
          <!-- Available Mod Card -->
          <RouterLink
            v-if="mod.available"
            :to="mod.route"
            class="card bg-base-200 hover:bg-base-300 border border-base-300 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full group-hover:scale-105">
            <figure class="px-6 pt-6">
              <div
                class="w-24 h-24 rounded-full bg-base-100 border-2 border-base-300 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                <img
                  :src="mod.icon"
                  :alt="mod.name"
                  class="w-16 h-16 object-contain"
                  style="image-rendering: pixelated" />
              </div>
            </figure>

            <div class="card-body text-center">
              <h2
                class="card-title justify-center text-2xl font-bold text-base-content">
                {{ mod.name }}
              </h2>

              <p class="text-base-content/70 leading-relaxed">
                {{ mod.description }}
              </p>

              <div class="card-actions justify-center mt-4">
                <div :class="['btn', mod.color, 'btn-lg']">
                  Explore Classes
                  <svg
                    class="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </RouterLink>

          <!-- Coming Soon Card -->
          <div
            v-else
            class="card bg-base-200/50 border border-base-300/50 shadow-lg h-full opacity-60 cursor-not-allowed">
            <figure class="px-6 pt-6">
              <div
                class="w-24 h-24 rounded-full bg-base-100/50 border-2 border-base-300/50 flex items-center justify-center">
                <img
                  :src="mod.icon"
                  :alt="mod.name"
                  class="w-16 h-16 object-contain grayscale"
                  style="image-rendering: pixelated" />
              </div>
            </figure>

            <div class="card-body text-center">
              <h2
                class="card-title justify-center text-2xl font-bold text-base-content/50">
                {{ mod.name }}
              </h2>

              <p class="text-base-content/40 leading-relaxed">
                {{ mod.description }}
              </p>

              <div class="card-actions justify-center mt-4">
                <div class="btn btn-disabled btn-lg">
                  Coming Soon
                  <svg
                    class="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionWrapper>
    </div>

    <!-- Features Section -->
    <div class="bg-base-200 border-t border-base-300">
      <div class="container mx-auto px-4 py-12">
        <TransitionWrapper
          type="fade"
          appear
          :delay="800">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-base-content mb-4">Features</h2>
            <p class="text-base-content/70 max-w-2xl mx-auto">
              Everything you need to optimize your Terraria gameplay experience
            </p>
          </div>
        </TransitionWrapper>

        <TransitionWrapper
          group
          type="scale"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          appear>
          <div
            v-for="(feature, index) in [
              {
                icon: '⚔️',
                title: 'Class Builds',
                desc: 'Comprehensive equipment guides for every class',
              },
              {
                icon: '🏆',
                title: 'Game Stages',
                desc: 'Organized by progression and boss defeats',
              },
              {
                icon: '📱',
                title: 'Responsive',
                desc: 'Works perfectly on all devices',
              },
              {
                icon: '🎨',
                title: 'Modern UI',
                desc: 'Clean and intuitive interface',
              },
            ]"
            :key="feature.title"
            :style="{ '--delay': `${(index + 10) * 100}ms` }"
            class="text-center p-6 bg-base-100 rounded-lg border border-base-300">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-lg font-semibold text-base-content mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-base-content/70 text-sm">{{ feature.desc }}</p>
          </div>
        </TransitionWrapper>
      </div>
    </div>
  </main>
</template>

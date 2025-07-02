<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    name?: string;
    type?: "fade" | "slide" | "scale" | "bounce" | "flip";
    mode?: "out-in" | "in-out";
    appear?: boolean;
    duration?: number | { enter: number; leave: number };
    delay?: number;
    disabled?: boolean;
    group?: boolean;
    tag?: string;
    moveClass?: string;
  }

  const {
    name = "",
    type = "fade",
    mode,
    appear = false,
    duration,
    delay = 0,
    disabled = false,
    group = false,
    tag = "div",
    moveClass,
  } = defineProps<Props>();

  // Generate the transition name based on type if no custom name is provided
  const transitionName = computed(() => {
    if (name) return name;
    return `transition-${type}`;
  });

  // Generate the move class name for TransitionGroup
  const moveClassName = computed(() => {
    if (moveClass) return moveClass;
    return `${transitionName.value}-move`;
  });

  // Calculate duration with delay
  const transitionDuration = computed(() => {
    if (!duration) return undefined;

    if (typeof duration === "number") {
      return duration + delay;
    }

    return {
      enter: duration.enter + delay,
      leave: duration.leave + delay,
    };
  });
</script>

<template>
  <!-- TransitionGroup for lists -->
  <TransitionGroup
    v-if="!disabled && group"
    :name="transitionName"
    :tag="tag"
    :appear="appear"
    :duration="transitionDuration"
    :move-class="moveClassName">
    <slot />
  </TransitionGroup>

  <!-- Regular Transition for single elements -->
  <Transition
    v-else-if="!disabled"
    :name="transitionName"
    :mode="mode"
    :appear="appear"
    :duration="transitionDuration">
    <slot />
  </Transition>

  <!-- Render content without transition if disabled -->
  <slot v-else />
</template>

<style>
  /* Fade Transition */
  .transition-fade-enter-active,
  .transition-fade-leave-active {
    transition: opacity 0.35s ease;
  }

  .transition-fade-enter-from,
  .transition-fade-leave-to {
    opacity: 0;
  }

  /* Slide Transition */
  .transition-slide-enter-active,
  .transition-slide-leave-active {
    transition: all 0.35s ease;
  }

  .transition-slide-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }

  .transition-slide-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  /* Scale Transition */
  .transition-scale-enter-active,
  .transition-scale-leave-active {
    transition: all 0.35s ease;
  }

  .transition-scale-enter-from,
  .transition-scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }

  /* Bounce Transition */
  .transition-bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .transition-bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Flip Transition */
  .transition-flip-enter-active,
  .transition-flip-leave-active {
    transition: all 0.4s ease;
  }

  .transition-flip-enter-from {
    opacity: 0;
    transform: rotateY(-90deg);
  }

  .transition-flip-leave-to {
    opacity: 0;
    transform: rotateY(90deg);
  }

  /* Move transitions for TransitionGroup */
  .transition-fade-move,
  .transition-slide-move,
  .transition-scale-move,
  .transition-bounce-move,
  .transition-flip-move {
    transition: transform 0.5s ease;
  }

  /* Staggered animations using CSS custom properties */
  .transition-scale-enter-active {
    transition: all 0.35s ease;
    transition-delay: var(--delay, 0ms);
  }

  .transition-bounce-enter-active {
    animation: bounce-in 0.5s;
    animation-delay: var(--delay, 0ms);
    animation-fill-mode: both;
  }

  .transition-slide-enter-active {
    transition: all 0.35s ease;
    transition-delay: var(--delay, 0ms);
  }

  .transition-fade-enter-active {
    transition: opacity 0.35s ease;
    transition-delay: var(--delay, 0ms);
  }

  .transition-flip-enter-active {
    transition: all 0.4s ease;
    transition-delay: var(--delay, 0ms);
  }
</style>

<script setup lang="ts">
  import { useTemplateRef } from "vue";

  const moreInfoModal = useTemplateRef("moreInfoModal");

  const openMoreInfoModal = () => {
    moreInfoModal.value?.showModal();
  };
</script>
<template>
  <footer
    class="footer p-2 bg-base-200 text-base-content border-t border-base-300">
    <div
      class="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full gap-2 max-w-full">
      <div class="hidden sm:block flex-1"></div>
      <div class="text-center flex-shrink-0">
        <p class="text-sm">
          Developed by
          <a
            href="https://lzart.com.br"
            target="_blank"
            class="link link-primary font-medium hover:link-hover"
            >LZArt</a
          >
        </p>
      </div>
      <div class="text-center sm:text-right flex-1 sm:flex sm:justify-end">
        <button
          class="text-sm link link-primary cursor-pointer whitespace-nowrap"
          @click="openMoreInfoModal">
          More Info
        </button>
      </div>
    </div>
  </footer>

  <!-- More Info Modal -->
  <dialog
    ref="moreInfoModal"
    class="modal">
    <div class="modal-box w-fit max-w-1/2">
      <h3 class="text-lg font-bold">More Information</h3>
      <p class="py-4">
        This app was heavily inspired by the work of
        <a
          href="http://github.com/kokasmark"
          target="_blank"
          class="link link-primary font-medium hover:link-hover"
          >@kokasmark</a
        >.
      </p>
      <p>
        You can find his original project at:
        <a
          href="https://kokasmark.github.io/classamity/"
          target="_blank"
          class="link link-primary font-medium hover:link-hover"
          >kokasmark.github.io/classamity/</a
        >
      </p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<template>
  <section>
    <div class="bg-zinc-300 h-24 w-full mx-auto max-w-7xl">
      <p>
        {{ title }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { title } = defineProps({
  title: String,
});
</script>

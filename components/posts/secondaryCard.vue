<template>
  <article class="flex flex-col bg-white rounded shadow-md overflow-hidden">
    <div class="h-1/2">
      <NuxtImg
        :src="image"
        alt="First post image"
        placeholder
        class="object-cover object-center w-full h-full"
      />
    </div>
    <div class="h-1/2 flex items-center text-left p-2">
      <h1 class="text-xl line-clamp-3">
        {{ title }}
      </h1>
    </div>
  </article>
</template>
<script setup lang="ts">
const { title, slug, image, description } = defineProps({
  id: Number,
  title: String,
  image: String,
  slug: String,
  description: String,
});
</script>

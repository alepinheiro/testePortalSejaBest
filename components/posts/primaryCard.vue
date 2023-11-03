<template>
  <article class="relative w-full z-0 flex overflow-hidden rounded shadow-md">
    <div
      class="h-full w-full flex flex-col items-end bg-gradient-to-b from-transparent to-black/60 text-white text-left "
    >
      <div class="w-full flex mt-auto px-4 mb-4">
        <h1 class="text-xl w-full">
          {{ title }}
        </h1>
      </div>
      <div class="bg-blue-800 p-4">
        {{ description }}
      </div>
    </div>

    <div v-if="image" class="absolute inset-0 -z-10">
      <NuxtImg
        :src="image"
        alt="First post image"
        placeholder
        class="object-cover object-center w-full h-full"
      />
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

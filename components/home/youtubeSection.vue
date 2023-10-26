<template>
  <section class="mt-48">
    <div class="flex flex-col gap-3 py-12 max-w-7xl w-full mx-auto">
      <div class="flex flex-row items-stretch gap-3 w-full">
        <div class="h-auto w-1/2 bg-blue-300">destaque principal bestplay</div>
        <div class="w-1/2 flex flex-row flex-wrap gap-3 flex-grow">
          {{ playlistItems }}
        </div>
      </div>
      <div class="max-w-5xl bg-red-200 h-24 mx-auto w-full">CTA BestPlay</div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { youtube_v3 } from 'googleapis';

const playlistItems = ref<youtube_v3.Schema$PlaylistItem[] | null>(null);

onBeforeMount(async () => {
  const { data, error, pending } = await useFetch(
    "/api/youtube/getYoutubePlaylist"
  );
  if (data) {
    console.log(data.value);
    playlistItems.value = data.value;
  }
});
</script>

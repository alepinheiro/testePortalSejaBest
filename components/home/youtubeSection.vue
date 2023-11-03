<template>
  <section class="mt-48 bg-zinc-800">
    <div
      v-if="playlistItems?.length"
      class="flex flex-col gap-3 py-12 max-w-7xl w-full mx-auto"
    >

    <div class="flex flex-row items-stretch gap-3 w-full">
        <div
          v-if="playlistItems[0].snippet"
          class="h-96 w-1/2 rounded overflow-hidden relative z-0"
        >
        <div class="w-full h-full bg-gradient-to-b from-transparent to-black z-10 relative flex items-end">
          <h1 class="text-white p-4 text-xl text-left">
            {{ playlistItems[0].snippet.title }}
          </h1>
        </div>
          <NuxtImg
            v-if="
              playlistItems[0].snippet.thumbnails &&
              playlistItems[0].snippet.thumbnails.standard &&
              playlistItems[0].snippet.thumbnails.standard.url
            "
            :src="playlistItems[0].snippet.thumbnails.standard.url"
            class="object-cover w-full h-full absolute inset-0 z-0 scale-110"
          />
        </div>

        <div class="w-1/2 flex flex-row flex-wrap gap-3 flex-grow">
          <div
            v-for="{ snippet } of playlistItems.slice(2, 6)"
            class=" w-1/3 flex-grow rounded overflow-hidden relative z-0"
          >
          <div class="w-full h-full bg-gradient-to-b from-transparent to-black z-10 relative flex items-end">
            <h2 class="text-sm text-white text-left line-clamp-2 p-2 w-full h-fit text-ellipsis">
              {{ snippet?.title }}
            </h2>
          </div>
            <NuxtImg
              v-if="
                snippet &&
                snippet.thumbnails &&
                snippet.thumbnails.standard &&
                snippet.thumbnails.standard.url
              "
              :src="snippet.thumbnails.standard.url"
              class="object-cover object-center absolute inset-0 z-0 scale-150"
            />
          </div>
        </div>
      </div>
      <div class="max-w-5xl bg-red-200 h-24 mx-auto w-full">CTA BestPlay</div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { youtube_v3 } from "googleapis";

const {
  data: playlistItems,
  error,
  pending,
} = await useFetch<youtube_v3.Schema$PlaylistItem[]>(
  "/api/youtube/getYoutubePlaylist"
);

// console.log(playlistItems.value);
</script>

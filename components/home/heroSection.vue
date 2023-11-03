<template>
  <section>
    <div class="flex flex-row items-stretch gap-3 mx-auto w-full">
      <div v-if="featuredPostData?.length" class="flex w-1/2">
        <PostsPrimaryCard
          :title="featuredPostData[0].title.rendered"
          :id="featuredPostData[0].id"
          :image="featuredPostData[0].yoast_head_json.og_image[0].url"
          :slug="featuredPostData[0].slug"
          :description="featuredPostData[0].yoast_head_json.description"
        />
      </div>
      <div
        v-if="posts && posts.length"
        class="w-1/2 flex flex-row flex-wrap gap-3 flex-grow"
      >
        <PostsSecondaryCard
          v-for="{ id, slug, title, yoast_head_json } of posts.slice(1, 5)"
          :key="id"
          :title="title.rendered"
          :description="yoast_head_json.description"
          :image="yoast_head_json.og_image[0].url"
          :slug="slug"
          class="w-1/3 h-48 flex-grow"
        />
      </div>
    </div>
    <div v-if="posts && posts.length" class="flex flex-row gap-3">
      <PostsSecondaryCard
        v-for="{ id, slug, title, yoast_head_json } of posts.slice(6, 10)"
        :key="id"
        :title="title.rendered"
        :description="yoast_head_json.description"
        :image="yoast_head_json.og_image[0].url"
        :slug="slug"
        class="w-1/3 h-48 flex-grow bg-blue-200"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
const { data: featuredPostData, error: featuredPostError } = await useFetch(
  "/api/posts/:slug",
  {
    params: { slug: "destaques-portal" },
  }
);

const { data: categoryData, error: categoryError } = await useFetch(
  "/api/categories/:slug",
  { params: { slug: "destaques" } }
);

const id = computed(() => {
  if (!categoryData.value) {
    return 730;
  }
  return categoryData.value[0].id;
});

const { data: posts, error: postsError } = await useFetch("/api/posts/:id", {
  params: { id: id.value },
});
</script>

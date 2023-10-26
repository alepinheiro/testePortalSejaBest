<template>
  <section>
    <div class="flex flex-row items-stretch gap-3 mx-auto w-full">
      <div class="flex w-1/2">
        <PostsPrimaryCard :="primaryHeroPost" />
      </div>
      <div
        v-if="secondaryHeroPost.length"
        class="w-1/2 flex flex-row flex-wrap gap-3 flex-grow"
      >
        <PostsSecondaryCard
          v-for="{
            id,
            slug,
            title,
            description,
            image,
          } in secondaryHeroPost.slice(0, 4)"
          :key="id"
          :title="title"
          :description="description"
          :image="image"
          :slug="slug"
          class="w-1/3 h-48 flex-grow"
        />
      </div>
    </div>
    <div v-if="secondaryHeroPost.length" class="flex flex-row gap-3">
      <PostsSecondaryCard
        v-for="{
          id,
          slug,
          title,
          description,
          image,
        } in secondaryHeroPost.slice(5, 9)"
        :key="id"
        :title="title"
        :description="description"
        :image="image"
        :slug="slug"
        class="w-1/3 h-48 flex-grow bg-blue-200"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
async function getPostsBySlug(slug: string) {
  const { data, error } = await useFetch("/api/posts/:slug", {
    params: { slug },
  });

  console.log({ getPostsBySlug: error.value });
  return data.value;
}

async function getPostsByCategorySlug(slug: string) {
  const { data: category, error: categoryError } = await useFetch(
    "/api/categories/:slug",
    { params: { slug } }
  );
  console.log({ getPostsByCategorySlug: categoryError.value });
  if (!category.value || category.value.length === 0) return;

  const id = category.value[0].id;

  const { data: posts, error: postsError } = await useAsyncData("posts", () =>
    $fetch("/api/posts/:id", { params: { id } })
  );

  console.log({ getPostsByCategorySlug: postsError.value });
  if (!posts.value) return;

  return posts.value;
}

const primaryHeroPost = ref({
  id: 1,
  title: "",
  image: "",
  description: "",
  slug: "destaques-portal",
});

const secondaryHeroPost = ref<
  {
    id: number;
    title: string;
    image: string;
    slug: string;
    description: string;
  }[]
>([]);

onBeforeMount(async () => {
  const primaryHeroPostRequest = await getPostsBySlug("destaques-portal");
  if (primaryHeroPostRequest && primaryHeroPostRequest.length) {
    primaryHeroPost.value.title = primaryHeroPostRequest[0].title.rendered;
    primaryHeroPost.value.id = primaryHeroPostRequest[0].id;
    primaryHeroPost.value.image =
      primaryHeroPostRequest[0].yoast_head_json.og_image[0].url;
    primaryHeroPost.value.slug = primaryHeroPostRequest[0].slug;
    primaryHeroPost.value.description =
      primaryHeroPostRequest[0].yoast_head_json.description;
  }

  const secondaryPosts = await getPostsByCategorySlug("destaques");
  if (secondaryPosts) {
    for (const post of secondaryPosts) {
      if (post.id !== primaryHeroPost.value.id) {
        secondaryHeroPost.value.push({
          id: post.id,
          description: post.yoast_head_json.description,
          image: post.yoast_head_json.og_image[0].url,
          slug: post.slug,
          title: post.title.rendered,
        });
      }
    }
  }
});
</script>

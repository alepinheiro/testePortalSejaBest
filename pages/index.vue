<template>
  <main class="flex flex-col w-full text-center bg-zinc-100">
    <!-- HEADER -->
    <section class="">
      <header class="h-12 bg-blue-800">Cabeçalho</header>
      <nav class="h-12 bg-blue-700">Menu</nav>
    </section>

    <AdvertisementFullSection :title="'AD'" class="py-12 flex items-center" />

    <!-- DESTAQUES -->
    <section class="flex flex-col gap-3 max-w-7xl mx-auto w-full">
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

    <AdvertisementFullSection :title="'AD'" class="py-12 flex items-center" />

    <!-- MAIS LIDAS -->
    <!-- <section>
      <div class="flex flex-col gap-3 max-w-7xl mx-auto">
        <div
          class="flex flex-row justify-between w-full border-b border-zinc-300 py-3"
        >
          <div>MAIS LIDAS</div>
          <div>Ver mais</div>
        </div>
        <div class="flex flex-row gap-3">
          <PostsSecondaryCard
            v-for="{ id, slug, title } in heroCategorySecondaryPosts"
            :key="id"
            :title="title"
            class="w-1/3 h-48 flex-grow bg-blue-200"
          />
        </div>
      </div>
    </section> -->

    <!-- NOVIDADES BESTPLAY -->
    <!-- <section class="mt-48">
      <div class="flex flex-col gap-3 py-12 max-w-7xl w-full mx-auto">
        <div class="flex flex-row items-stretch gap-3 w-full">
          <div class="h-auto w-1/2 bg-blue-300">
            destaque principal bestplay
          </div>
          <div class="w-1/2 flex flex-row flex-wrap gap-3 flex-grow">
            <PostsSecondaryCard
              v-for="{ id, slug, title } in heroCategorySecondaryPosts"
              :key="id"
              :title="title"
              class="w-1/3 h-48 flex-grow bg-blue-200"
            />
          </div>
        </div>
        <div class="max-w-5xl bg-red-200 h-24 mx-auto w-full">CTA BestPlay</div>
      </div>
    </section> -->

    <!-- CATEGORIAS -->
    <!-- <section class="my-48">
      <div class="flex flex-row gap-3 w-full max-w-7xl mx-auto">
        <div
          v-for="category in categories"
          :key="category"
          class="w-full flex flex-col items-stretch gap-3"
        >
          <div class="py-4 border-b border-zinc-300 text-left">
            {{ category }}
          </div>
          <div class="h-72 bg-blue-300 w-full">
            Destaque principal categoria
          </div>
          <PostsSecondaryCard
            v-for="{ id, slug, title } in heroCategorySecondaryPosts"
            :key="id"
            :title="title"
            class="w-full h-48 bg-blue-200"
          />
          <button class="w-full py-4 bg-blue-800 text-white">
            Ver mais {{ category }}
          </button>
        </div>
      </div>
    </section> -->

    <!-- CTAS -->
    <section class="flex flex-col">
      <div class="h-96 bg-emerald-200 w-full">CTA BESTPLAY</div>
      <div class="h-96 bg-blue-200 w-full">CTA TELEGRAM</div>
    </section>

    <!-- FOOTER -->
    <footer>
      <div class="h-96 bg-black text-white w-full">FOOTER</div>
    </footer>
  </main>
</template>

<script setup lang="ts">
async function getPostsBySlug(slug: string) {
  const { data, error } = await useAsyncData("getPostsBySlug", () =>
    $fetch("/api/posts/:slug", { params: { slug } })
  );

  console.log({ getPostsBySlug: error.value });
  return data.value;
}

async function getPostsByCategorySlug(slug: string) {
  const { data: category, error: categoryError } = await useAsyncData(
    "categories",
    () => $fetch("/api/categories/:slug", { params: { slug } })
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

const categories = ref([
  "Empréstimo com Garantia",
  "Financiamento Imobiliário",
  "Negócios",
]);

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

getPostsBySlug("destaques-portal").then((result) => {
  if (!result) return;
  primaryHeroPost.value.title = result[0].title.rendered;
  primaryHeroPost.value.id = result[0].id;
  primaryHeroPost.value.image = result[0].yoast_head_json.og_image[0].url;
  primaryHeroPost.value.slug = result[0].slug;
  primaryHeroPost.value.description = result[0].yoast_head_json.description;
});

getPostsByCategorySlug("destaques").then((result) => {
  if (!result) return;
  for (const post of result) {
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
});
</script>

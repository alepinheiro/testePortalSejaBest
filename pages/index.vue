<template>
  <main class="flex flex-col w-full text-center bg-zinc-100">
    <!-- HEADER -->
    <section class="">
      <header class="h-12 bg-blue-800">Cabeçalho</header>
      <nav class="h-12 bg-blue-700">Menu</nav>
    </section>

    <AdvertisementFullSection :title="'AD'" class="py-12 flex items-center" />
    <HomeHeroSection class="flex flex-col gap-3 max-w-7xl mx-auto w-full" />
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
      </div>
    </section> -->

    <!-- NOVIDADES BESTPLAY -->
    <HomeYoutubeSection />

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


const categories = ref([
  "Empréstimo com Garantia",
  "Financiamento Imobiliário",
  "Negócios",
]);

const mostReadPosts = ref<
  {
    id: number;
    title: string;
    image: string;
    slug: string;
    description: string;
  }[]
>([]);




</script>

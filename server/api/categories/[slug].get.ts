interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[]; // Você pode especificar um tipo apropriado para os metadados
  yoast_head: string;
  yoast_head_json: {
    title: string;
    robots: {
      index: string;
      follow: string;
      "max-snippet": string;
      "max-image-preview": string;
      "max-video-preview": string;
    };
    canonical: string;
    og_locale: string;
    og_type: string;
    og_title: string;
    og_url: string;
    og_site_name: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      type: string;
    }[];
    twitter_card: string;
    schema: {
      "@context": string;
      "@graph": any[]; // Você pode especificar um tipo apropriado aqui
    };
  };
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
    about: {
      href: string;
    }[];
    up: {
      embeddable: boolean;
      href: string;
    }[];
    wp_post_type: {
      href: string;
    }[];
    curies: {
      name: string;
      href: string;
      templated: boolean;
    }[];
  };
}

export default defineEventHandler(async (event) => {
  const params = getQuery<{ slug: string }>(event);

  if (!params) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required",
    });
  }

  if (params) {
    const { slug } = params;
    const data = await $fetch<Category[]>(
      "https://portal.seja.best/wp-json/wp/v2/categories/",
      {
        query: {
          params: { slug },
        },
      }
    );
    return data;
  }
});

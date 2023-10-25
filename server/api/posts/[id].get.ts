interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    "content-type": string;
    _mi_skip_tracking: boolean;
    _monsterinsights_sitenote_active: boolean;
    _monsterinsights_sitenote_note: string;
    _monsterinsights_sitenote_category: number;
    _mbp_gutenberg_autopost: boolean;
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  yoast_head: string;
  yoast_head_json: {
    title: string;
    description: string;
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
    og_description: string;
    og_url: string;
    og_site_name: string;
    article_publisher: string;
    article_published_time: string;
    article_modified_time: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      type: string;
    }[];
    author: string;
    twitter_card: string;
    twitter_misc: {
      "Escrito por": string;
      "Est. tempo de leitura": string;
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
    author: {
      embeddable: boolean;
      href: string;
    }[];
    replies: {
      embeddable: boolean;
      href: string;
    }[];
    "version-history": {
      count: number;
      href: string;
    }[];
    "predecessor-version": {
      id: number;
      href: string;
    }[];
    "wp:featuredmedia": {
      embeddable: boolean;
      href: string;
    }[];
    "wp:attachment": {
      href: string;
    }[];
  };
}

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const data = await $fetch<Post[]>(
    "https://portal.seja.best/wp-json/wp/v2/posts/",
    {
      query: {
        params: { id },
      },
    }
  );
  return data;
});

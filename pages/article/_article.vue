<template>
  <article>
    <v-row>
      <v-col>
        <v-card>
          <v-img
            class="white--text align-end"
            max-height="500px"
            :src="articleImage"
            :alt="article.alt"
          >
            <v-card-title class="overlayed" v-text="article.title">
            </v-card-title>
          </v-img>

          <v-card-subtitle class="light-gray--text">
            {{ formatDate(article.updatedAt) }}
            <v-divider class="mx-4" vertical />
            <ReadTime :content="article"></ReadTime>
          </v-card-subtitle>

          <v-card-text>
            <v-divider class="pb-2"></v-divider>
            <nuxt-content :document="article" />
          </v-card-text>
          <v-card-actions v-if="areActionsVisible">
            <v-spacer></v-spacer>

            <v-btn icon color="orange" disabled>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon color="orange" disabled>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.article).fetch()

    return { article }
  },
  data() {
    return {
      areActionsVisible: true,
    }
  },
  computed: {
    articleImage: {
      get() {
        return this.article.img || 'https://picsum.photos/1920/500?random'
      },
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
html {
  font-family: Quicksand, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  line-height: 1.5;
}

*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #e2e8f0;
}

.nuxt-content {
  line-height: 3em;
}

.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
</style>
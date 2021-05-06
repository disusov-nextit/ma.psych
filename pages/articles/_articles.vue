<template>
  <article>
    <v-row>
      <v-col>
        <v-card>
          <v-img
            class="white--text align-end"
            max-height="500px"
            min-height="300px"
            :src="articleImage(article)"
            :alt="article.alt"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-card-title class="overlayed" v-text="article.title">
            </v-card-title>
          </v-img>

          <v-card-subtitle class="light-gray--text">
            <v-row no-gutters>
              <v-col>{{ formatDate(article.updatedAt) }}</v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto"
                ><ReadTime :content="article"></ReadTime
              ></v-col>
            </v-row>
          </v-card-subtitle>

          <v-card-text>
            <v-divider class="pb-2"></v-divider>
            <nuxt-content :document="article" />
            <v-row class="pt-2">
              <v-btn
                v-if="prev"
                text
                link
                :to="{
                  name: 'articles-articles',
                  params: { articles: prev.slug },
                }"
              >
                <v-icon left>mdi-page-previous-outline</v-icon>
                {{ prev.title }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="next"
                text
                link
                :to="{
                  name: 'articles-articles',
                  params: { articles: next.slug },
                }"
              >
                <v-icon left>mdi-page-next-outline</v-icon>
                {{ next.title }}
              </v-btn>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

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
    const slug = params.articles
    const article = await $content('articles', slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
  data() {
    return {
      areActionsVisible: true,
    }
  },
  methods: {
    articleImage(article) {
      return article.img !== undefined
        ? require(`~/assets/img/${article.img}`)
        : `https://picsum.photos/1920/500?random`
    },
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
<template>
  <v-container fluid>
    <v-row v-for="article of articles" :key="article.slug">
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-card
          hover
          link
          :to="{ name: 'article-article', params: { article: article.slug } }"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :lazy-src="randomImage(article.slug)"
          >
            <v-card-title class="overlayed" v-text="article.title">
            </v-card-title>
          </v-img>

          <v-card-subtitle>
            {{ formatDate(article.updatedAt) }}
          </v-card-subtitle>

          <v-card-text>
            <div>{{ article.description }}</div>
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
    <!--Add here the vuetify directive -->
    <v-card v-intersect="infiniteScrolling"></v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Articles',
  data() {
    return {
      articles: [],
      page: 1,
      perPage: 10,
      opacity: 1,
      areActionsVisible: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    randomImage(slug) {
      return `https://picsum.photos/1920/1024?random&_v=${slug}`
    },
    async fetchData() {
      this.articles = await this.fetchArticles(this.page)
    },
    async fetchArticles(page) {
      return await this.$content('articles')
        .sortBy('created_at', 'desc')
        .limit(this.perPage)
        .skip(this.perPage * (page - 1))
        .fetch()
    },
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        this.page++

        this.fetchArticles(this.page)
          .then((response) => {
            if (response.length > 1) {
              response.data.forEach((item) => this.articles.push(item))
            } else {
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }, 500)
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
<template>
  <v-container fluid>
    <v-row
      no-gutters
      v-for="article of articles"
      :key="article.slug"
      class="pb-6"
    >
      <v-col>
        <v-card
          hover
          link
          :to="{
            name: 'articles-articles',
            params: { articles: article.slug },
          }"
        >
          <v-img
            class="white--text align-end"
            max-height="300px"
            :src="articleImage(article)"
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

          <v-card-subtitle>
            <v-row no-gutters>
              <v-col>{{ formatDate(article.updatedAt) }}</v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto"
                ><ReadTime :content="article"></ReadTime
              ></v-col>
            </v-row>
          </v-card-subtitle>

          <v-card-text>
            <div>{{ article.description }}</div>
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
    articleImage(article) {
      return article.img !== undefined
        ? require(`~/assets/img/${article.img}`)
        : `https://picsum.photos/1920/500?random`
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
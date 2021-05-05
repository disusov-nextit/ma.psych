<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" elevation="2" app>
      <v-spacer />
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-tabs class="pl-2">
        <v-tab link to="/">Статии</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      fixed
      bottom
      right
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Малина Атанасова</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Статии',
          to: '/',
        },
      ],
      right: true,
      title: 'Малинини Светове',
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === undefined) return

      const top = window.pageYOffset || e.target.scrollTop || 0

      this.fab = top > 20
    },
    toTop() {
      const options = {
        duration: 300,
        offset: 0,
        easing: 'easeInCubic',
      }

      this.$vuetify.goTo(0, options)
    },
  },
}
</script>
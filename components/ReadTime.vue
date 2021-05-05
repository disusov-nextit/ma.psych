<template>
  <span>{{ readTime }} min read</span>
</template>

<script>
export default {
  name: "ReadTime",

  props: ["content"],

  computed: {
    readTime() {
      var minutes = 0;
      const contentText = JSON.stringify(this.content);
      const words = contentText.split(" ").length;
      const wordsPerMinute = 200;
      minutes = Math.ceil(words / wordsPerMinute);
      return minutes;
    }
  }
};
</script>
<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Bbs extends Vue {
  private articleName = "";
  private articleContent = "";

  /**
   * 記事を追加する.
   */
  addArticle(): void {
    let newID = this.currentArticleList[0].id + 1;
    this["$store"].commit("addArticle", {
      article: {
        id: newID,
        name: this.articleName,
        content: this.articleContent,
        commentList: [],
      },
    });
    this.articleName = "";
    this.articleContent = "";
  }
}
</script>

<style></style>

<template>
  <div>
    <div class="ex"></div>
    <div>投稿者名：<input type="text" v-model="articleName" /></div>
    <div>
      投稿内容：<textarea
        cols="30"
        rows="10"
        v-model="articleContent"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Article } from "../types/article";
@Component
export default class BbsDetail extends Vue {
  // 現在の記事一覧
  private currentArticleList = new Array<Article>();


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

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
}
</script>
<style></style>

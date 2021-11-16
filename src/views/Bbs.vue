<template>
  <div class="container">
    <div class="bbs">
      <div>投稿者名：<input type="text" v-model="articleName" /></div>
      <div>
        投稿内容：<textarea
          name=""
          id=""
          cols="30"
          rows="6"
          v-model="articleContent"
        ></textarea>
      </div>
      <button
        type="button"
        v-on:click="addArticle"
        class="waves-effect waves-light btn"
      >
        記事投稿
      </button>
      <hr />

      <div>
        <div v-for="(article, i) of currentArticleList" v-bind:key="article.id">
          投稿者名：{{ article.name }} <br />
          投稿内容：<br />
          {{ article.content }} <br />

          <button v-on:click="deleteArticle(i)" type="button">記事削除</button>

          <div v-for="comment of article.commentList" v-bind:key="comment.id">
            <br />
            コメント者名：{{ comment.name }} <br />
            コメント内容：<br />{{ comment.content }}
          </div>
          <br />
          <div>名前：<input type="text" v-model="commentName" /><br /></div>
          <div>
            コメント：<textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="commentContent"
            ></textarea>
          </div>
          <button
            class="waves-effect waves-light btn"
            type="button"
            v-on:click="addComment(article.id)"
          >
            コメント投稿
          </button>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Comment } from "@/types/Comment";

import { Article } from "../types/article";
@Component
export default class BbsDetail extends Vue {
  private currentArticleList = new Array<Article>(); //現在の記事一覧
  private articleName = "";
  private articleContent = "";
  private commentName = "";
  private commentContent = "";

  /**
   * Vuexストアの中の記事一覧を表示させる.
   */
  created(): void {
    this.currentArticleList = this["$store"].getters.getArticles;
  }
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
  /**
   * コメントを追加する.
   *
   * @param articleId - 対象の記事ID
   */
  addComment(articleId: number): void {
    this["$store"].commit("addComment", {
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }
  /**
   * 記事削除する.
   *
   * @param payload - 記事のindex番号
   */
  deleteArticle(articleIndex: number): void {
    this["$store"].commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.bbs {
  text-align: left;
  display: inline-block;
}
</style>

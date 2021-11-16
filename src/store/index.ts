import Vue from "vue";
import Vuex from "vuex";
import { Article } from "../types/article";
import { Comment } from "../types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  },
  mutations: {
    /**
     * 記事を追加する.
     *
     * @param state - ステートオブジェクト
     * @param payload - 投稿する記事情報
     */
    addArticle(state, payload) {
      console.dir(JSON.stringify(payload));
      state.articles.unshift(payload.article);
    },
    /**
     * コメントを追加する.
     *
     * @param state - ステートオブジェクト
     * @param payload - 投稿するコメント情報
     */
    addComment(state, payload) {
      for (const article of state.articles) {
        if (article.id == payload.comment.articleId) {
          article.commentList.unshift(payload.comment);
        }
      }
    },
    /**
     * 記事を削除する.
     *
     * @param state - ステートオブジェクト
     * @param payload - 対象の記事
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload, 1);
    },
  },
  actions: {},
  modules: {},

  getters: {
    /**
     * 記事一覧を返す.
     *
     * @param state - ステートオブジェクト
     * @returns 記事一覧
     */
    getArticles(state) {
      return state.articles;
    },
  },
});

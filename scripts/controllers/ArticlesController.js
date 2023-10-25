const TokenRepositories = require("../repositories/TokenRepositories");
const { originApi, destinyApi } = require("../api/api");

class ArticleController {
  // Articles Categories
  async getArticleCategoriesList() {
    let articlesCategoriesList = await originApi
      .get(
        "content-manager/collection-types/api::articles-categorie.articles-categorie?page=1&pageSize=500&sort=title:ASC",
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data.results);
    let articlesCategories = articlesCategoriesList.map((category) => {
      return {
        title: category.title,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    });
    return articlesCategories;
  }
  async createArticleCategory(category) {
    let newCategory = await destinyApi
      .post(
        `content-manager/collection-types/api::articles-category.articles-category`,
        category,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data);
    console.log("Created article category ", newCategory.id);
    return newCategory;
  }

  // Articles Links
  async getArticleLinksList() {
    let articlesLinksList = await originApi
      .get(
        "content-manager/collection-types/api::articles-link.articles-link?page=1&pageSize=100&sort=title:ASC&locale=de-AT",
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data.results);
    let articlesLinks = articlesLinksList.map((link) => {
      return {
        id: link.id,
        // title: link.title,
        // components: link.component,
        // createdAt: link.createdAt,
        // updatedAt: link.updatedAt,
      };
    });
    return articlesLinks;
  }
  async getActualArticleLinkById(linkId) {
    let link = await originApi
      .get(
        `content-manager/collection-types/api::articles-link.articles-link/${linkId}`,
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data);
    link.components = link.component;

    return link;
  }
  async createArticleLink(articleLink) {
    let newArticleLink = await destinyApi
      .post(
        `content-manager/collection-types/api::article-link.article-link`,
        articleLink,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data)
      .catch((error) => console.error(error));
    console.log("Created Article Link", newArticleLink.id);
    return newArticleLink;
  }

  // Articles
  async getArticlesList() {
    let articlesList = await originApi
      .get(
        "content-manager/collection-types/api::article.article?page=1&pageSize=500&sort=title:ASC&locale=de-AT&filters[$and][0][domain][$eq]=benu",
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data.results);
    let articles = articlesList
      .filter((article) => article.publishedAt)
      .map((article) => {
        return {
          id: article.id,
        };
      });
    return articles;
  }
  async getActualArticleById(articleId) {
    let article = await originApi
      .get(
        `content-manager/collection-types/api::article.article/${articleId}`,
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data);
    return article;
  }
  async createArticle(article) {
    let newArticle = await destinyApi
      .post(
        `content-manager/collection-types/api::article.article`,
        article,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data);
    console.log("Created article ", article.id);
    return newArticle;
  }
}

module.exports = new ArticleController();

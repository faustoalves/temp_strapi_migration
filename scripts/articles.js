const {
  parseAccordion,
  parseAdvantage,
  parseBenubox,
  parseButtonGroup,
  parseCtaCompact,
  parseCtaExtend,
  parseCtaFull,
  parseGuideline,
  parseHighlight,
  parseIFrame,
  parseImageSlider,
  parseLinks,
  parseMultipleMap,
  parseOpinion,
  parseReferences,
  parseRelatedArticles,
  parseSimpleHTML,
  parseYoutubePlayer,
} = require("./components/ArticlesComponents");

const TokenRepositories = require("./repositories/TokenRepositories");
const ArticlesComponents = require("./components/ArticlesComponents");
const ArticlesController = require("./controllers/ArticlesController");

let totalComponents = 0;

const init = async () => {
  await TokenRepositories.getDestinyToken();
  await TokenRepositories.getOriginToken();
  setTimeout(() => {}, 2000, "initial Tokens");
  let articlesList = await ArticlesController.getArticlesList();
  await Promise.all(
    articlesList.map(async (article, index) => {
      setTimeout(() => {}, index * 100, "initial Tokens");
      let newArticle = await ArticlesController.getActualArticleById(
        article.id
      );
      newArticle.components = await parseComponents(
        newArticle.components,
        newArticle.slug
      );
    })
  );
  ArticlesComponents.printMyMap();
};

const componentsType = {
  "articles-components.accordion": parseAccordion,
  "articles-components.adv_disadv": parseAdvantage,
  "articles-components.benubox": parseBenubox,
  "articles-components.buttons-group": parseButtonGroup,
  "articles-components.cta-compact": parseCtaCompact,
  "articles-components.cta-full": parseCtaFull,
  "articles-components.cta-extend": parseCtaExtend,
  "articles-components.guideline": parseGuideline,
  "articles-components.highlight-box": parseHighlight,
  "articles-components.iframe-ga": parseIFrame,
  "articles-components.image-slider": parseImageSlider,
  "articles-components.links": parseLinks,
  "articles-components.multiple-map": parseMultipleMap,
  "articles-components.opinion": parseOpinion, // OK
  "articles-components.references": parseReferences, // OK
  "articles-components.related-articles": parseRelatedArticles,
  "articles-components.text-block": parseSimpleHTML, // OK
  "articles-components.youtube-player": parseYoutubePlayer, // OK
};
let countImageSlider = 0;
const parseComponents = async (components, title) => {
  let newComponents = [];
  await Promise.all(
    components.map(async (component, index) => {
      try {
        let newComponent = await componentsType[component.__component](
          component,
          title
        );

        if (Array.isArray(newComponent)) {
          newComponents = [...newComponents, ...newComponent];
        } else {
          if (newComponent.__component.includes("articles-cta.")) {
            console.log(newComponent);
          }
          newComponents.push(newComponent);
        }
      } catch (error) {
        // console.error("ERROR", component.__component, title);
      }
    })
  );
  return newComponents;
};

init();

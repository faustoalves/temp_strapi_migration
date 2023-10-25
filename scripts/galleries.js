const {
  parseAccordion,
  parseAdvantage,
  parseBenubox,
  parseButtonGroup,
  parseCtaCompact,
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
const ImagesController = require("./controllers/ImagesController");
const GalleriesController = require("./controllers/GalleriesController");

let allGalleries = [];

const init = async () => {
  await TokenRepositories.getDestinyToken();
  await TokenRepositories.getOriginToken();
  setTimeout(() => {}, 2000, "initial Tokens");
  // ArticlesControllers.createArticle({
  //   id: 5,
  //   seo: {
  //     title: "111",
  //     description: "111",
  //     canonical: "111",
  //     sharingImage: 1078,
  //     indexFollow: "noIndexNoFollow",
  //   },
  //   read_time: 5,
  //   // author: {
  //   //   disconnect: [],
  //   //   connect: []
  //   // },
  //   domain: "benu",
  //   title: "11111",
  //   slug: "11111",
  //   timestamp: "2023-10-20",
  //   components: [
  //     {
  //       __component: "articles.image",
  //       image: 1078,
  //     },
  //     { __component: "articles.image", image: 292 },

  //     { __component: "articles.image", image: 458 },
  //     { __component: "articles.image", image: 697 },
  //     { __component: "articles.image", image: 694 },
  //     {
  //       __component: "articles.text",
  //       content:
  //         "<p><em>Christus spricht: Ich bin das Licht der Welt. Wer mir nachfolgt, der wird nicht wandeln in der Finsternis, sondern wird das Licht des Lebens haben.</em></p><p><strong>Johannes 8,12</strong></p><p><em>Gott spricht: Fürchte dich nicht, denn ich habe dich erlöst; ich habe dich bei deinem Namen gerufen; du bist mein!</em></p><p><strong>Jesaja 43,1</strong></p><p><em>Wir wissen aber, so unser irdisch Haus dieser Hütte zerbrochen wird, dass wir einen Bau haben, von Gott erbauet, ein Haus, nicht mit Händen gemacht, das ewig ist, im Himmel.</em></p><p><strong>2. Korinther 5,1</strong></p><p><em>Denn er hat seinen Engeln befohlen, dass sie dich behüten auf allen deinen Wegen, dass sie dich auf den Händen tragen und du deinen Fuß nicht an einen Stein stoßest.</em></p><p><strong>Psalm 91, 11-12</strong></p><p><em>Ich aber, Gott, hoffe auf dich und spreche: Du bist mein Gott! Meine Zeit steht in deinen Händen.</em></p><p><strong>Psalm 31,15</strong></p><p><em>Gott spricht: Ich lasse dich nicht fallen und verlasse dich nicht.</em></p><p><strong>Josua 1.5b</strong></p>",
  //     },
  //     {
  //       __component: "articles.text",
  //       content:
  //         "<p><em>Ich bin die Auferstehung und das Leben. Wer an mich glaubt, der wird leben, auch wenn er stirbt.</em></p><p><strong>Johannes 11,25</strong></p><p><em>Ihr habt jetzt Trauer, aber ich werde Euch wiedersehen und Euer Herz wird sich freuen.</em></p><p><strong>Johannes 16,22</strong></p><p><em>Ich bin die Auferstehung und das Leben. Wer an mich glaubt, der wird leben, auch wenn er stirbt. In Deine Hände befehle ich meinen Geist. Du hast mich erlöst, Herr, Du treuer Gott.</em></p><p><strong>Psalm 31,6</strong></p><p><em>Gott ist mein Hirte, mir wird nichts mangeln. Und ob ich schon wanderte im finstern Tal, fürchte ich kein Unglück; denn du bist bei mir, dein schützender Hirtenstab tröstet mich.</em></p><p><strong>Psalm 23,1-4</strong></p><p><em>Ihr habt jetzt Trauer, aber ich werde Euch wieder sehen und Euer Herz wird sich freuen.</em></p><p><strong>Johannes. 16,22</strong></p><p><a></a></p><h2>Lateinische Trauersprüche</h2>",
  //     },
  //     {
  //       __component: "articles.text",
  //       content:
  //         "<p>Lateinische Trauersprüche haben eine lange Tradition bei Beisetzungen. Latein als Sprache der katholischen Kirche hat für viele Menschen einen besonderen Bezug zum Tod und zur Trauer. Als Spruch für edle Trauerkarten und Beileidswünsche mit gehobenem Anspruch.</p><p><strong>DEO VOLANTE</strong></p><p><em>Mit Gottes Willen</em></p><p><strong>SEMPER FIDELIS</strong></p><p><em>Für immer treu</em></p><p><strong>REQUIESCAT IN PACE</strong></p><p><em>Ruhe in Frieden</em></p><p><strong>SIT TIBI TERRA LEVIS.</strong></p><p><em>Die Erde sei dir leicht.</em></p><p><strong>DEUS VULT</strong></p><p><em>Gott will es</em></p><p><strong>DUM SPIRO SPERO</strong></p><p><em>Solange ich atme, hoffe ich</em></p>",
  //     },
  //     {
  //       __component: "articles.text",
  //       content:
  //         "<p><strong>BENE QUIESCAT</strong></p><p><em>Möge er/sie wohl ruhen</em></p><p><strong>HIC REQUIESCIT IN PACE</strong></p><p><em>Hier ruht in Frieden</em></p><p><strong>IN MEMORIAM</strong></p><p><em>Zum Gedächtnis</em></p><p><strong>MORS CERTA, HORA INCERTA</strong></p><p><em>Der Tod ist sicher, nur die Stunde ist ungewiss</em></p><p><strong>LETI MILLE REPENTE VIAE</strong></p><p><em>Schnell führen tausende Wege in den Tod</em></p><p><strong>CUM TACENT CLAMANT.</strong></p><p><em>Indem sie schweigen, reden sie.</em></p><p><strong>DE OMNIBUS DUBITANDUM.</strong></p><p><em>An allem ist zu zweifeln.</em></p><p><strong>TEMPUS FUGIT – AMOR MANET</strong></p><p><em>Die Zeit vergeht – die Liebe bleibt</em></p><p><strong>VIVERE MILITARE EST.</strong></p><p><em>Zu leben heißt zu kämpfen.</em></p><p><strong>MEMENTO HOMO, QUIA ES EX PULVERE ET IN PULVEREM REVERTER.</strong></p><p><em>Mensch, erinnere dich, dass du aus Staub bist und wieder Staub werden wirst.</em></p>",
  //     },
  //     { __component: "articles.image", image: 292 },
  //     { __component: "articles.image", image: 704 },
  //     { __component: "articles.image", image: 503 },
  //     { __component: "articles.image", image: 506 },
  //     { __component: "articles.image", image: 504 },
  //     { __component: "articles.image", image: 1028 },
  //     { __component: "articles.image", image: 501 },
  //     { __component: "articles.image", image: 502 },
  //   ],
  // });

  let articlesLinkList = await ArticlesController.getArticleLinksList();
  await Promise.all(
    articlesLinkList.map(async (link, index) => {
      let newLink = await ArticlesController.getActualArticleLinkById(link.id);
      await parseComponents(newLink.components, newLink.title);
    })
  );
  let articlesList = await ArticlesController.getArticlesList();
  await Promise.all(
    articlesList.map(async (article, index) => {
      let newArticle = await ArticlesController.getActualArticleById(
        article.id
      );
      await parseComponents(
        newArticle.components,
        `${newArticle.slug} Gallery`
      );
    })
  );
  await Promise.all(
    allGalleries.map(async (gallery, index) => {
      await GalleriesController.createNewGallery(gallery);
    })
  );
  console.log(allGalleries.length, "galleries created");
  // console.log("Image Slider = ", countImageSlider);
};

const componentsType = {
  "articles-components.accordion": parseAccordion,
  "articles-components.adv_disadv": parseAdvantage,
  "articles-components.benubox": parseBenubox,
  "articles-components.buttons-group": parseButtonGroup,
  "articles-components.cta-compact": parseCtaCompact,
  "articles-components.cta-full": parseCtaFull,
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
      // console.log(component);
      if (component.__component === "articles-components.image-slider") {
        countImageSlider++;
        // console.log(component);
        let images = await Promise.all(
          component.images.map(async (image) => {
            let newImage = await ImagesController.getNewImageId(image.url);
            return newImage.id;
          })
        );
        // console.log(images);
        allGalleries.push({
          name: title,
          images: images,
        });
      }

      // let newComponent = await componentsType[component.__component](component);
      // if (Array.isArray(newComponent)) {
      //   newComponents = [...newComponents, ...newComponent];
      // } else {
      //   newComponents.push(newComponent);
      // }
    })
  );
  return newComponents;
};

init();

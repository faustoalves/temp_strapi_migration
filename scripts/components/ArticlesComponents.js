const GalleriesController = require("../controllers/GalleriesController");
const ImagesController = require("../controllers/ImagesController");
const { getNewImageId } = require("../controllers/ImagesController");

let myMap = new Map();

class ArticlesComponents {
  // "articles-components.accordion":

  async printMyMap() {
    console.log(myMap);
  }

  async parseAccordion(component, title) {
    addKey(component.__component);
  }
  // "articles-components.adv_disadv"
  async parseAdvantage(component, title) {
    // console.log(JSON.stringify(component));
    // console.log(component.__component, title);
    addKey(component.__component);
  }
  // "articles-components.benubox"
  async parseBenubox(component, title) {
    // console.log(JSON.stringify(component));
    // console.log(component.__component, title);
    addKey(component.__component);
  }
  // "articles-components.buttons-group"
  async parseButtonGroup(component, title) {
    addKey(component.__component);
    let buttons = component.buttons.map((button) => parseButton(button));
    return {
      __component: "articles-cta.cta-solid-1",
      title: component.title,
      content: component.info,
      button: buttons[0],
      style: "secondary",
    };
  }
  // "articles-components.cta-compact"
  async parseCtaCompact(component, title) {
    // console.log(component.__component, title);
    // console.log(JSON.stringify(component));
    addKey(component.__component);
  }
  // "articles-components.cta-full"
  async parseCtaExtend(component, title) {
    // console.log(component);
    addKey(component.__component);
    let newButtons = component.buttons.map((button) => parseButton(button));
    let bullets = null;
    if (component.buttons && component.buttons.length > 0) {
      bullets = component.bullets.map((bullet) => {
        return {
          icon: "check",
          label: bullet.label,
        };
      });
    }
    return {
      __component: "articles-cta.cta-solid-3",
      title: component.title,
      content: component.content,
      alternativeText: component.buttons_single_text_alt,
      buttons: newButtons,
      bullets: bullets,
    };
  }
  // "articles-components.cta-full"
  async parseCtaFull(component, title) {
    addKey(component.__component);
    let button = parseButton(component.button);
    if (component.background_effect.type === "image") {
      let imageId = await ImagesController.getNewImageId(
        component.background_effect.desktop_background.url
      );
      return await {
        __component: "articles-cta.cta-image-3",
        title: component.title,
        content: `${component.text_1 && `<h4>${component.text_1}</h4>`}${
          component.text_2 && `<p>${component.text_2}</p>`
        }`,
        image: imageId.id,
        buttons: [button],
      };
    } else {
      return {
        __component: "articles-cta.cta-solid-2",
        title: component.title,
        content: `${component.text_1 && `<h4>${component.text_1}</h4>`}${
          component.text_2 && `<p>${component.text_2}</p>`
        }`,
        buttons: [button],
        style: "secondary",
      };
    }
  }
  // "articles-components.guideline"
  async parseGuideline(component, title) {
    // console.log(component.__component, title);
    addKey(component.__component);
  }
  // "articles-components.highlight-box"
  async parseHighlight(component, title) {
    addKey(component.__component);
    return {
      __component: "articles.highlight",
      content: component.content,
    };
  }
  // "articles-components.iframe-ga"
  async parseIFrame(component, title) {
    addKey(component.__component);
  }
  // "articles-components.image-slider"
  async parseImageSlider(component, title) {
    addKey(component.__component);
    console.log(title);
    if (!title.includes("Gallery")) {
      title = `${title} Gallery`;
    }
    let gallery = await GalleriesController.getGalleryByName(title);
    return {
      __component: "articles.image-slider",
      gallery: gallery.id,
    };
  }
  // "articles-components.links"
  async parseLinks(component, title) {
    addKey(component.__component);
  }
  // "articles-components.multiple-map"
  async parseMultipleMap(component, title) {
    addKey(component.__component);
  }
  // "articles-components.opinion"
  async parseOpinion(component, title) {
    addKey(component.__component);
    // console.log(component.__component);
    component.items = await Promise.all(
      component.items.map(async (item, index) => {
        let image = await getNewImageId(item.image.url);
        item.image = image.id;
        return item;
      })
    );
    component.__component = "articles.opinion";
    return component;
  }

  // "articles-components.references"
  async parseReferences(component, title) {
    addKey(component.__component);
    component.__component = "articles.references";
    return component;
  }
  // "articles-components.related-articles"
  async parseRelatedArticles(component, title) {
    addKey(component.__component);
  }
  // "articles-components.text-block"
  async parseSimpleHTML(component, title) {
    addKey(component.__component);
    let newContent = component.content.split("\n");
    let count = 0;
    let contentArray = [];
    await Promise.all(
      newContent.map(async (line) => {
        if (line.includes("<img")) {
          count++;
          line = line.split('src="').pop();
          line = line.split('"')[0];
          let image = await getNewImageId(line);
          // console.log(image);
          contentArray[count] = {
            __component: "articles.image",
            image: image.id,
          };
          count++;
        } else {
          if (contentArray[count]) {
            contentArray[count] = `${contentArray[count]}${line}`;
          } else {
            contentArray[count] = line;
          }
        }
      })
    );
    contentArray = contentArray.filter((content) => content !== null);
    contentArray = contentArray.map((content) => {
      if (content?.__component) {
        return content;
      }
      return {
        __component: "articles.text",
        content: content,
      };
    });
    return contentArray;
  }
  // "articles-components.youtube-player"
  async parseYoutubePlayer(component, title) {
    addKey(component.__component);
    return {
      __component: "articles.youtube-player",
      youtubeId: component.youtube_id,
    };
  }
}

const addKey = (key) => {
  // console.log(key);
  if (myMap.has(key)) {
    // console.log("Found key");
    let counter = myMap.get(key);
    myMap.set(key, counter + 1);
  } else {
    myMap.set(key, 1);
  }
};

const parseButton = (button) => {
  return {
    label: button.primary_label,
    extraLabel: button.secondary_label,
    type: button.type,
    link: button.link,
    buttonId: button.object_id,
  };
};

module.exports = new ArticlesComponents();

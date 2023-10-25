const TokenRepositories = require("../repositories/TokenRepositories");
const { originApi, destinyApi } = require("../api/api");
const { getNewImageId } = require("./ImagesController");

class GalleriesController {
  async createNewGallery(gallery) {
    let newGallery = await destinyApi
      .post(
        `content-manager/collection-types/api::gallery.gallery`,
        gallery,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data);
    console.log("Created gallery ", newGallery.name);
    return newGallery;
  }
  async getGalleryByName(name) {
    let findGallery = await destinyApi
      .get(
        `content-manager/collection-types/api::gallery.gallery?page=1&pageSize=10&sort=name:ASC&_q=${name}`,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data.results);
    return findGallery[0];
  }
}

module.exports = new GalleriesController();

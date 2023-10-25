const TokenRepositories = require("../repositories/TokenRepositories");
const { originApi, destinyApi } = require("../api/api");

class ImageController {
  async getNewImageId(url) {
    let filename = url.split("/").pop();
    if (filename.includes("?updated_at=")) {
      filename = filename.split("?updated_at=")[0];
    }

    let imageList = await destinyApi
      .get(
        `upload/files?sort=name:ASC&page=1&pageSize=100&_q=${filename}`,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data.results);
    if (imageList.length > 0) {
      // console.log("OK:", url);
      return imageList[0];
    }
    // console.error("Error:", url);
    return { id: 0 };
  }
}

module.exports = new ImageController();

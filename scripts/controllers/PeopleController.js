const TokenRepositories = require("../repositories/TokenRepositories");
const { originApi, destinyApi } = require("../api/api");
const { getNewImageId } = require("./ImagesController");

class PeopleController {
  async getAtualTeam() {
    let team = await originApi
      .get(
        "https://strapi.benu.at/content-manager/collection-types/api::team.team?page=1&pageSize=100",
        await TokenRepositories.getOriginToken()
      )
      .then((result) => result.data);
    let filteredTeam = await Promise.all(
      team.results
        .filter((person) => person.publishedAt)
        .map(async (person) => {
          let image = await getNewImageId(person.small_image.url);
          return {
            name: person.name,
            role: person.role,
            image: image.id,
            publishedAt: "2023-10-21T02:44:08.167Z",
          };
        })
    );
    return filteredTeam;
  }
  async createNewPerson(person) {
    let newPerson = await destinyApi
      .post(
        `content-manager/collection-types/api::person.person`,
        person,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data);
    console.log("Created person ", newPerson.name);
    let publishPerson = await destinyApi
      .post(
        `content-manager/collection-types/api::person.person/${newPerson.id}/actions/publish`,
        person,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data);
    console.log("Publish person ", publishPerson.name);
    return publishPerson;
  }
  async getPersonByName(name) {
    let findPerson = await destinyApi
      .get(
        `content-manager/collection-types/api::person.person?page=1&pageSize=10&sort=name:ASC&_q=${name}`,
        await TokenRepositories.getDestinyToken()
      )
      .then((result) => result.data.results);
    return findPerson[0];
  }
}

module.exports = new PeopleController();

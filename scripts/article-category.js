const fs = require("fs");
const TokenRepositories = require("./repositories/TokenRepositories");
const PeopleController = require("./controllers/PeopleController");
const ArticlesController = require("./controllers/ArticlesController");

const init = async () => {
  console.log(await TokenRepositories.getDestinyToken());
  await TokenRepositories.getOriginToken();
  setTimeout(() => {}, 2000, "initial Tokens");
  let actualCategories = await ArticlesController.getArticleCategoriesList();
  // await PeopleController.createNewPerson(actualTeam[0]);
  Promise.all(
    actualCategories.map(async (category) => {
      console.log(category);
      await ArticlesController.createArticleCategory(category);
    })
  );
  console.log("Finish Article Categories Migration");
};
init();

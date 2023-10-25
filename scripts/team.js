const fs = require("fs");
const TokenRepositories = require("./repositories/TokenRepositories");
const PeopleController = require("./controllers/PeopleController");

const init = async () => {
  await TokenRepositories.getDestinyToken();
  await TokenRepositories.getOriginToken();
  setTimeout(() => {}, 2000, "initial Tokens");
  let actualTeam = await PeopleController.getAtualTeam();
  // await PeopleController.createNewPerson(actualTeam[0]);
  Promise.all(
    actualTeam.map(async (person) => {
      await PeopleController.createNewPerson(person);
    })
  );
  console.log("Finish Team Migration");
};
init();

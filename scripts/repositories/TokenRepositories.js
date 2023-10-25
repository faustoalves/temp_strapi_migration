const api = require("../api/api");

let originToken = {};
let destinyToken = {};
class TokenRepositories {
  async getOriginToken() {
    if (originToken?.token) {
      return {
        headers: {
          Authorization: `Bearer ${originToken.token}`,
        },
      };
    } else {
      originToken = await this.loadOriginToken();
      return {
        headers: {
          Authorization: `Bearer ${originToken.token}`,
        },
      };
    }
  }
  async loadOriginToken() {
    const response = await api.originApi
      .post("admin/login", {
        email: process.env.ORIGIN_STRAPI_USER,
        password: process.env.ORIGIN_STRAPI_PASSWORD,
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    return response;
  }
  async getDestinyToken() {
    if (destinyToken?.token) {
      return {
        headers: {
          Authorization: `Bearer ${destinyToken.token}`,
        },
      };
    } else {
      destinyToken = await this.loadDestinyToken();
      return {
        headers: {
          Authorization: `Bearer ${destinyToken.token}`,
        },
      };
    }
  }
  async loadDestinyToken() {
    const response = await api.destinyApi
      .post("admin/login", {
        email: process.env.DESTINY_STRAPI_USER,
        password: process.env.DESTINY_STRAPI_PASSWORD,
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    return response;
  }
}

module.exports = new TokenRepositories();

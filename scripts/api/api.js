const axios = require("axios");

const originApi = axios.create({
  baseURL: process.env.ORIGIN_STRAPI,
});

const destinyApi = axios.create({
  baseURL: process.env.DESTINY_STRAPI,
});

module.exports = {
  originApi: originApi,
  destinyApi: destinyApi,
};

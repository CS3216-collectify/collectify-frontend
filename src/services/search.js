import server from "../utils/server";

const mockItemByCollection = {
  itemName: "Shiny Charmander",
  itemDescription: "My first ever card!",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  coverImage: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
};

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const searchCollections = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  }
  console.log("GET /collections... string-query:", params);
  const res = await server.get("/collections", params);
  console.log(res);
  return res.data;
};

export const searchItems = async (keywords, offset, limit) => {
  // TODO: UNCOMMENT below once endpoint is ready

  // if (!keywords) {
  //   return [];
  // }
  // const params = {
  //   keywords,
  //   offset,
  //   limit,
  // };
  // console.log("GET /items... string query:", params);
  // const res = await server.get("/items", params);
  // return res.data;

  // TODO: REMOVE below once endpoint is ready
  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockItemByCollection, itemId: idx}));
};

export const searchUsers = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  }
  console.log("GET /api/user/search... string query:", params);
  const res = await server.get("/api/user/search", params);
  console.log(res);
  return res.data;
};

const mockItemByCollection = {
  itemName: "Shiny Charmander",
  itemDescription: "My first ever card!",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  coverImage: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
};

const mockCollections = {
  collections: [
    {
      collectionId: 123,
      collectionName: "1st Gen Pokemon Cards",
      collectionDescription: "My collection of 1st gen cards",
      categoryId: 19,
      categoryName: "Pokemon Cards",
      userId: 12,
      collectionCreationDate: "2021-09-23T01:22:47.541Z",
      coverImages: [
        "https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg",
        "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
        "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
      ],
    },
  ],
};

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFollowedCollections = async (offset, limit) => {
  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockCollections.collections[0], collectionId: idx}));
};

export const getLikedItems = async (offset, limit) => {
  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockItemByCollection, itemId: idx}));
};

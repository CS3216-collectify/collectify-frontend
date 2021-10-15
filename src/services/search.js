const mockPhoto = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

const mockUsernames = ["andrea", "brian", "chantelle", "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  "chantelle",  
  "daniel", "elyse", "funman", "gareth", "hakiem", "iriana", 
  "jason", "kevin", "leonardo", "mike", "nicholas", "owen", 
  "peter", "queen", "rain", "samantha",];

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

const mockItemByCollection = {
  itemName: "Shiny Charmander",
  itemDescription: "My first ever card!",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  coverImage: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
};

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const searchCollections = async (keyword, offset, limit) => {
  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockCollections.collections[0], collectionId: idx}));
};

export const searchItems = async (keyword, offset, limit) => {
  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockItemByCollection, itemId: idx}));
};

export const searchUsers = async (
  keyword,
  offset,
  limit
) => {
  const mockUsernamesCopy = [...mockUsernames].sort();
  await timeout(1500);
  return mockUsernamesCopy
    .filter(uname => uname.toLowerCase().startsWith(keyword))
    .slice(offset, offset + limit)
    .map((username, idx) => ({ username, userId: idx, profilePhotoUrl: mockPhoto }));
};
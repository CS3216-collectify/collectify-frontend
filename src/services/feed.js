const mockItem = {
  itemId: 501,
  itemName: "Rare Mew Two",
  itemDescription: "Bought for $100",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  ownerId: 5,
  ownerUsername: "username",
  ownerName: "Owner Name",
  collectionName: "Pokemon",
  isLiked: true,
  likesCount: 4,
  images: [
    {
      imageId: 2,
      url: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
      imageUploadDate: "2021-09-23T01:22:47.541Z",
    },
  ],
};

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFeed = async (userId, offset, limit) => {
  await timeout(1500);
  return Array.from({length: limit}, () => ({...mockItem}));
}
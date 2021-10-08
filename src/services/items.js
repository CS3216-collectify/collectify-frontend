const sampleImage = "https://pbs.twimg.com/profile_images/1377854248621199360/F7S8p4xK_400x400.jpg";

const mockItemByCollection = {
    itemName: "Shiny Charmander",
    itemDescription: "My first ever card!",
    itemCreationDate: "2021-09-23T01:22:47.541Z",
    coverImage: {
        url: sampleImage,
    },
}

export const getItemsByCollectionId = async (collectionId, offset, limit) => {
    // TODO: Replace with actual 
    if (offset === 18) {
        limit = 14;
    }
    return [...Array.from({length: limit}, (_, idx) => {
        return {...mockItemByCollection, itemId: idx + offset, collectionId};
    })]
}

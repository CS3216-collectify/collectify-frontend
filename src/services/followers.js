const mockPhoto = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

const mockFollowers = [
  {
    username: "andrea",
  },
  {
    username: "brian",
  },
  {
    username: "chantelle",
  },
  {
    username: "daniel",
  },
];

// TODO: Cache results?
export const getFollowersByCollectionId = async (
  collectionId,
  offset,
  limit
) => {
  return mockFollowers.map((p, idx) => ({ ...p, collectionId, userId: idx, profilePhotoUrl: mockPhoto }));
};

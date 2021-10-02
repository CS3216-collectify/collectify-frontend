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
  return mockFollowers.map((p, idx) => ({ ...p, collectionId, userId: idx }));
};

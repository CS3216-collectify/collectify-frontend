const mockLikes = [
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
export const getLikesByItemId = async (itemId, offset, limit) => {
  return mockLikes.map((p, idx) => ({ ...p, itemId, userId: idx }));
};

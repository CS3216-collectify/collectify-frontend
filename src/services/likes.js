const mockPhoto = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

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
  return mockLikes.map((p, idx) => ({ ...p, itemId, userId: idx, profilePhotoUrl: mockPhoto }));
};

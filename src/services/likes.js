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
  {
    username: "elyse",
  },
  {
    username: "funman",
  },
  {
    username: "gareth",
  },
  {
    username: "hakiem",
  },
  {
    username: "iriana",
  },
  {
    username: "jason",
  },
  {
    username: "kevin",
  },
  {
    username: "leonardo",
  },
  {
    username: "mike",
  },
  {
    username: "nicholas",
  },
  {
    username: "owen",
  },
  {
    username: "peter",
  },
  {
    username: "queen",
  },
  {
    username: "rain",
  },
  {
    username: "samantha",
  },
];

// TODO: Cache results?
export const getLikesByItemId = async (itemId, offset, limit) => {
  return mockLikes.slice(offset, offset + limit).map((p, idx) => ({ ...p, itemId, userId: idx, profilePhotoUrl: mockPhoto }));
};

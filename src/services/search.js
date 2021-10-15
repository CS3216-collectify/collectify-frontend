const mockPhoto = "https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1";

const mockUsernames = ["andrea", "brian", "chantelle", 
  "daniel", "elyse", "funman", "gareth", "hakiem", "iriana", 
  "jason", "kevin", "leonardo", "mike", "nicholas", "owen", 
  "peter", "queen", "rain", "samantha",];

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const searchCollections = async (keyword, offset, limit) => {
  return [];
};

export const searchItems = async (keyword, offset, limit) => {
  return [];
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
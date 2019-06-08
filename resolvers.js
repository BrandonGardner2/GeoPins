const user = {
  _id: "1",
  name: "Brandon",
  email: "brandon@gardner.dev",
  picture: "pictures"
};

module.exports = {
  Query: {
    me: () => user
  }
};

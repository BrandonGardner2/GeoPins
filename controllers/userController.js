const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  //Verify token
  const googleUser = await verifyAuthToken(token);
  //Check if exists
  const user = await checkIfUserExists(googleUser.email);
  //If exists, return user
  //Create user in db otherwise
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async authToken => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: authToken,
      audience: process.env.OAUTH_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying auth token", err);
  }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save();
};

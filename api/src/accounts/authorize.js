import pkg from "bcryptjs";
const { compare } = pkg;

export async function authorizeUser(email, password) {
  const { user } = await import("../user/user.js");
  //look up user
  const userData = await user.findOne({
    "email.address": email,
  });
  if (userData) {
    //get user password
    const savedPassword = userData.password;
    //compare password with one in db
    const isAuthorized = await compare(password, savedPassword);
    //return boolean of if password is correct
    return {
      isAuthorized,
      userId: userData._id,
      authenticatorSecret: userData.authenticator,
    };
  }
  return {
    isAuthorized: false,
    userId: null,
    authenticatorSecret: null,
  };
}

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const axios = require('axios');
const qs = require('query-string');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const googleRegister = catchAsync(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  const user = await userService.createUser({
    name,
    email,
    picture,
    password: process.env.COMMON_GOOGLE_PASSWORD,
    registrationType: 'google',
  });
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email, email_verified } = ticket.getPayload();
  if (email_verified) {
    const user = await authService.loginUserWithEmailAndPassword(email, process.env.COMMON_GOOGLE_PASSWORD);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

// linkedin
// Constand
const urlToGetLinkedInAccessToken = 'https://www.linkedin.com/oauth/v2/accessToken';
const urlToGetUserProfile =
  'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))';
const urlToGetUserEmail =
  'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))';

const getUserCredentials = catchAsync(async (req, res) => {
  const user = {};
  const code = req.query.code;
  const accessToken = getAccessToken(code);
  const userProfile = getUserProfile(accessToken);
  const userEmail = getUserEmail(accessToken);
  let resStatus = 400;
  if (!(accessToken === null || userProfile === null || userEmail === null)) {
    user = userBuilder(userProfile, userEmail);
    resStatus = 200;
  }
  // Here, you can implement your own login logic
  // to authenticate new user or register him
  res.status(resStatus).json({ user });
});

/**
 * Get access token from LinkedIn
 * @param code returned from step 1
 * @returns accessToken if successful or null if request fails
 */
function getAccessToken(code) {
  let accessToken = null;
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  const parameters = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
  axios
    .post(urlToGetLinkedInAccessToken, qs.stringify(parameters), config)
    .then((response) => {
      accessToken = response.data['access_token'];
    })
    .catch((err) => {
      console.log('Error getting LinkedIn access token');
    });
  return accessToken;
}

/**
 * Get user first and last name and profile image URL
 * @param accessToken returned from step 2
 */
function getUserProfile(accessToken) {
  let userProfile = null;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  axios
    .get(urlToGetUserProfile, config)
    .then((response) => {
      userProfile.firstName = response.data['localizedFirstName'];
      userProfile.lastName = response.data['localizedLastName'];
      userProfile.profileImageURL = response.data.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
      // I mean, couldn't they have burried it any deeper?
    })
    .catch((error) => console.log('Error grabbing user profile'));
  return userProfile;
}

/**
 * Get user email
 * @param accessToken returned from step 2
 */
function getUserEmail(accessToken) {
  const email = null;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  axios
    .get(urlToGetUserEmail, config)
    .then((response) => {
      email = response.data.elements[0]['handle~'];
    })
    .catch((error) => console.log('Error getting user email'));

  return email;
}

/**
 * Build User object
 */
function userBuilder(userProfile, userEmail) {
  return {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    profileImageURL: userProfile.profileImageURL,
    email: userEmail,
  };
}

module.exports = {
  register,
  googleRegister,
  googleLogin,
  getUserCredentials,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

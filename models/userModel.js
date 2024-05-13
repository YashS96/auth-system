import { constants } from "./constants";

/**
 * desc: db call to get user
 * @param { * } id
 * @param { * } app
 */
export const getUser = (id, app) => (app.db.get('users').find({ id: id }).value())

/**
 * desc: db call to update user data
 * @param { * } newData
 * @param { * } app
 */
export const updateUserData = (newData, app) => {
  let user = app.db.get('users').find({ id: newData.id });
  if (!user.value()) {
    throw new Error('user not found!')
  }
  user = {
    ...user,
    newData
  }
  return user.assign(user).write();
}

/**
 * desc: db call to get user data depending on caller role
 * @param { * } app
 * @param { * } privateStatus
 */
export const getUserProfiles = (app, admin) => {
  if (admin) {
    return app.db.get('users');
  }
  return app.db.get('users').find({ profile_status: constants.PUBLIC }).value();
}

/**
 * desc: db call to update user data
 * @param { * } id
 * @param { * } status
 * @param { * } app
 */
export const setProfileStatus = (id, status, app) => {
  let user = getUser(id, app);
  user = {
    ...user,
    profile_status: status
  }
  return user.assign(newData).write();


}
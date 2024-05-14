import { constants } from '../utils/constants.js'
import { writeFileSync } from 'node:fs'

/**
 * desc: db call to get user
 * @param { * } id
 * @param { * } app
 */
export const getUser = async (id, app) => {
  const { data } = await app.db;
  const { users } = data;
  return users.find((user) => user.id.toString() === id.toString())

}

/**
 * desc: db call to update user data
 * @param { * } newData
 * @param { * } app
 */
export const updateUserData = async (id, newData, app) => {
  let user = await getUser(id, app);
  if (!user) {
    return null
  }
  const { data } = await app.db;
  let { users } = data;
  let index = users.indexOf(user);
  user = {
    ...user,
    ...newData
  }
  users[index] = user
  writeFileSync('utils//db.json', JSON.stringify({ users: users }))
  return user
}

/**
 * desc: db call to get user data depending on caller role
 * @param { * } app
 * @param { * } privateStatus
 */
export const getUserProfiles = async (app, admin) => {
  const { data } = await app.db;
  const { users } = data;
  console.log(users)
  if (admin) {
    return users
  }
  return users.filter((user) => user.profile_status === constants.PUBLIC)
}

/**
 * desc: db call to update user data
 * @param { * } id
 * @param { * } status
 * @param { * } app
 */
export const setProfileStatus = async (id, status, app) => {
  let user = await getUser(id, app);
  if (!user) {
    return null
  }
  const { data } = await app.db;
  let { users } = data;
  let index = users.indexOf(user);
  user = {
    ...user,
    profile_status: status
  }
  users[index] = user
  writeFileSync('utils//db.json', JSON.stringify({ users: users }))
  return user
}
/**
 * desc: db call to fetch user
 * @param { * } username
 * @param { * } app
 */
export const getExisitingUser = (username, app) => (app.db.get('users').find({ username }).value())

/**
 * desc: db call to add user
 * @param { * } newUser
 */
export const registerNewUser = (newUser) => (db.get('users').push(newUser).write())
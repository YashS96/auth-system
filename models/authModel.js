import { writeFileSync } from 'node:fs'
/**
 * desc: db call to fetch user
 * @param { * } username
 * @param { * } app
 */
export const getExisitingUser = async (username, app) => {
    const { data } = await app.db;
    const { users } = data;
    return users.find((user) => user.username === username)
}

/**
 * desc: db call to add user
 * @param { * } newUser
 */
export const registerNewUser = async (newUser, app) => {
    const { data } = await app.db;
    const { users } = data;
    users.push(newUser);
    writeFileSync('utils//db.json', JSON.stringify({users : users}))// simulating db write() operation with writeFile()
    return newUser
}
import { JSONFilePreset } from 'lowdb/node'
import { readFileSync } from 'node:fs'


/**
 * desc: db init method
 * @param { * } req
 * @param { * } res
 * @param { * } next
 */
export const initializeDb = async () => {
  try {
    // Initialize default data 
    const defaultData = readFileSync('utils/db.json')
    const db = await JSONFilePreset('db.json', JSON.parse(defaultData))
    return db
  } catch (err) {
    console.log(err)
  }
}
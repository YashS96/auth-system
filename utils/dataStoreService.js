const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
// Initialize lowdb with JSON file storage 
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

/**
 * desc: db init method
 * @param { * } req
 * @param { * } res
 * @param { * } next
 */
export const initializeDb = () => {
    try {
      // Initialize default data 
      db.defaults({ users: [] }).write();
      return db
    } catch (err) {
      console.log(err)
    }
  }
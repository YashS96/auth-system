/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - password
 *         - firstName
 *         - role
 *         - profile_status 
 *       properties:
 *         id:
 *           type: string
 *           description: unique user id
 *         firstName:
 *           type: string
 *           description: first name of the user
 *         lastName:
 *           type: string
 *           description: last name of the user
 *         role:
 *           type: string
 *           description: user role- user or admin
 *         profile_status:
 *           type: string
 *           description: prolie's status- public or private
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: hashwd password
 *         bio:
 *           type: string
 *           description: users bio
 *         email:
 *           type: string
 *           description: email id
 *         photo:
 *           type: string
 *           description: url to image
 *         phone:
 *           type: string
 *           description: string phone number
 *       example:
 *            id: 1
 *            firstName: TDog
 *            lastName: Medhurst
 *            email: atuny0@sohu.com
 *            phone: +63 791 675 8914
 *            username: atuny0
 *            password: $2b$10$urU2Tg0wMLR3vxJr8V5WeObyG3J0EdZQK063Pvivd02nr3chU4Isa
 *            photo: https://robohash.org/Terry.png?set=set4
 *            role: user
 *            bio: xyz
 *            profile_status: private
 */

 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Authentication actions via Internal database managemet
  */

 /**
  * @swagger
  * tags:
  *   name: OAuth2.0
  *   description: Authentication actions via external Service Provider
  */

 /**
  * @swagger
  * tags:
  *   name: Profile
  *   description: User Profile actions
  */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: hashwd password
 *       example:
 *           username: atuny0
 *           password: 9uQFasdsadF1Lh
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginOutput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: hashed password
 *       example: 
 *             message: Login successful.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StatusUpdateInput:
 *       type: object
 *       required:
 *         - id
 *         - profile_status
 *       properties:
 *         id:
 *           type: string
 *           description: id
 *         profile_status:
 *           type: string
 *           description: profile_status
 *       example:
 *           id: 1
 *           profile_status: private
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateInput:
 *       type: object
 *       required:
 *          - id
 *       properties:
 *         id:
 *           type: string
 *           description: id of user
 *         firstName:
 *           type: string
 *           description: firstName
 *         email:
 *           type: string
 *           description: email
 *         bio:
 *           type: string
 *           description: bio
 *         phone:
 *           type: string
 *           description: phone no.
 *         photo:
 *           type: string
 *           description: photo url
 *         username:
 *           type: string
 *           description: username
 *         profile_status:
 *           type: string
 *           description: profile
 *       example:
 *            id: 1
 *            firstName: TDog
 *            lastName: Medhurst
 *            email: atuny0@sohu.com
 *            phone: +63 791 675 8914
 *            username: atuny0
 *            photo: https://robohash.org/Terry.png?set=set4
 *            bio: xyz
 *            profile_status: private
 */
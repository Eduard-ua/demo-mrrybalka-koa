const crypto = require('crypto');

const db = require('../../db/db');
//const { User } = require('./UserDb');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error('User does not exist'); //with id: ${id},
    }

    // return new User(userResponse.rows[0]);
    return { ...userResponse.rows[0] };
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      throw new Error(`User with email: ${email}, does not exist`);
    }

    return { ...userResponse.rows[0] };
  }

  static async checkPassword(email, password) {
    const usersResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);
    if (!usersResponse.rowCount) {
      return { flag: false, message: `User with email: ${email} doesn't exist` };
    }

    const user = { ...usersResponse.rows[0] };

    const passwordHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex');
    
    if (user.password === passwordHash) {
      return { user, flag: true }; 
    }

    return {
      flag: false, message: 'Incorect password!'
    };
    // const err = new Error('Incorect password!');
    // err.isPassport = true;
    // throw err;
  }
}

module.exports = { UserDB };




/*

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      throw new Error(`User with email: ${email}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      return { message: `User with email: ${email}, does not exist`, flag: false };
    }

    const user = { ...userResponse.rows[0] };

    if (crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex') !== user.password) {
      return { message: 'Incorect password', flag: false };
    }

    return { user: new User(user), flag: true };
  }

  static async createUser(fname, lname, active, password, email) {
    const passwordHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex');

    const createUserResponse = await db.query(`INSERT INTO "user" (fname, lname, isActive, password, email) 
        VALUES ('${fname}', '${lname}', ${active}, '${passwordHash}', '${email}') RETURNING *`)
      .catch((err) => {
        if (err.constraint === 'user_email') {
          const error = new Error('User with the same email already exists');
          error.status = 400;
          throw error;
        }
        throw new Error(err.message);
      });

    return new User(createUserResponse.rows[0]);
  }

  static async userList() {
    const userListResponse = await db.query('SELECT * FROM "user"');

    const users = userListResponse.rows.map((userDb) => new User(userDb));

    return users;
  }

  static async updateUserPhoto(photoUrl, email) {
    await db.query(`
      UPDATE "user" SET photo = '${photoUrl}'
      WHERE email = '${email}'
    `);
  }
}

module.exports = { UserDB };
*/
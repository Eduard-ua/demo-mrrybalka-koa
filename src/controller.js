const crypto = require('crypto');
const passport = require('koa-passport');
const jwt = require('jwt-simple');

const db = require('./db/db');
const validator = require('./validator');
const { UserDB } = require('./models/user/UserDB');

async function home(ctx) {
  // const { userId } = ctx.request.params;
  // const usersResponse = await db.query(`SELECT * FROM "user" WHERE id = ${userId}`);
  // // const userInRedis = await ctx.redis.get(userId);
  // // console.log(JSON.parse(userInRedis));
  // if (!usersResponse.rowCount) {
  //   ctx.throw(400, 'User doesn`t exist');
  // }
  
  // const user = usersResponse.rows[0];
  ctx.body = {
    success: true,
  };

}

async function refresh(ctx) {
  const token = ctx.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token, 'super_secret_refresh');

  if (decodedToken.expiresIn <= new Date().getTime()) {
    const error = new Error('Refresh token expired, please sign in into your account.');
    error.status = 400;

    throw error;
  }

  const user = await UserDB.getUserByEmail(decodedToken.email);

  const accessToken = {
    id: user.id,
    expiresIn: new Date().setTime(new Date().getTime() + 200000),
  };
  const refreshToken = {
    email: user.email,
    expiresIn: new Date().setTime(new Date().getTime() + 1000000),
  };

  ctx.body = {
    accessToken: jwt.encode(accessToken, 'super_secret'),
    accessTokenExpirationDate: accessToken.expiresIn,
    refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
    refreshTokenExpirationDate: refreshToken.expiresIn,
  };
}

  // static async userList(ctx) {
  async function userList(ctx) {
    const users = (await UserDB.userList()).map((user) => user.getInfo());

    ctx.body = {
      users,
    };
}

async function createUser(ctx) {
  const { body } = ctx.request;

  await validator.schema.validateAsync(body);

  body.password = crypto.pbkdf2Sync(body.password, 'salt', 100000, 64, 'sha256').toString('hex');

  const createUserResponse = await db.query(`INSERT INTO "user" (fname, lname, isActive, password, email) 
  VALUES  ('${body.fname}', '${body.lname}', ${body.active}, '${body.password}', '${body.email}') RETURNING *`);

  const user = { ...createUserResponse.rows[0] };

  // await ctx.redis.set(user.id, JSON.stringify(user));
  ctx.status = 201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  };
}

async function SignLin(ctx) {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
      if (err) {
        ctx.body = { error: err };
      }
    }
  })(ctx);
}



// async function home(ctx) {
//   const usersPromise = await db.query('SELECT * FROM "user"');
//   const name = usersPromise.rows[0].fname;
//   await ctx.render('index', {
//     title: 'Home',
//   });
// }

async function signIn(ctx) {
  await ctx.render('sign_in_1', {
    title: 'Sign In',
  });
}

async function signIn2(ctx) {
  await ctx.render('sign_in_2', {
    title: 'Sign In',
  });
}

async function signIn3(ctx) {
  await ctx.render('sign_in_3', {
    title: 'Sign In',
  });
}

async function signIn4(ctx) {
  await ctx.render('sign_in_4', {
    title: 'Sign In',
  });
}

async function signUp(ctx) {
  await ctx.render('sign_up_1', {
    title: 'Sign Up',
  });
}

async function signUp2(ctx) {
  await ctx.render('sign_up_2-4', {
    title: 'Sign Up',
  });
}

async function signUp3(ctx) {
  await ctx.render('sign_up_5', {
    title: 'Sign Up',
  });
}

async function profile(ctx) {
  await ctx.render('my_profile', {
    title: 'Profile',
  });
}

async function search(ctx) {
  await ctx.render('my_search', {
    title: 'Search',
  });
}

async function usersAll(ctx) {
  await ctx.render('usersAll', {
    title: 'Users',
  });
}

async function userList(ctx) {
  const userListResponse = await db.query('SELECT * FROM "user"');

  const users = userListResponse.rows;

  ctx.body = {
    users,
  };
}

module.exports = {
 
  home,
  signIn,
  signIn2,
  signIn3,
  signIn4,
  signUp,
  signUp2,
  signUp3,
  profile,
  search,
  usersAll,
  createUser,
  refresh,
  userList,
  SignLin,
};

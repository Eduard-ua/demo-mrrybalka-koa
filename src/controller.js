const db = require('./db/db');
const validator = require('./validator');

async function home(ctx) {
  const { userId } = ctx.request.params;
  const usersResponse = await db.query(`SELECT * FROM "user" WHERE id = ${userId}`);
  // const userInRedis = await ctx.redis.get(userId);
  // console.log(JSON.parse(userInRedis));
  if (!usersResponse.rowCount) {
    ctx.throw(400, 'User doesn`t exist');
  }
  
  const name = usersResponse.rows[0].fname;
  
  await ctx.render('index', {
    title: name,
   });
}

async function createUser(ctx) {
  const { body } = ctx.request;

  await validator.schema.validateAsync(body);

  const createUserResponse = await db.query(`INSERT INTO "user" (fname, lname, isActive) VALUES  ('${body.fname}', '${body.lname}', ${body.active}) RETURNING *`);

  const user = { ...createUserResponse.rows[0] };

  // await ctx.redis.set(user.id, JSON.stringify(user));
  ctx.status = 201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
  };
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

async function users(ctx) {
  await ctx.render('users', {
    title: 'Users',
  });
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
  users,
  createUser,
};

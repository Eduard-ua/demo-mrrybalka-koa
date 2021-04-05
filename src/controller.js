async function home(ctx) {
  await ctx.render('index', {
    title: 'Home',
  });
}

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
};

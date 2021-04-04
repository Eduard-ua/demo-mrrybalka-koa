async function profile(ctx) {
  await ctx.render('index', {
    title: 'Home',
  });
}

async function signIn(ctx) {
  await ctx.render('sign_in_1', {
    title: 'Sign In',
  });
}

async function signIn(ctx) {
  await ctx.render('sign_in_1', {
    title: 'Sign In',
  });
}


module.exports = {
  signIn,
  profile,

};

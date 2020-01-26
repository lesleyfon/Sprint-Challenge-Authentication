exports.seed = async function(knex) {å
  await  knex("users").truncate()
};

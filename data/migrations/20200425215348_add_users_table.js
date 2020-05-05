
exports.up = function(knex) {
  return knex.schema.createTable("Users",Users=>{
    Users.increments("id").index();
    Users.string("username",50).notNullable().index();
    Users.string("password",255).notNullable();
    Users.email("email").notNullable();
    Users.datetime("created_at");
    Users.datetime("lastconnection_at");
    //Rol foreing key
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};

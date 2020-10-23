
exports.up = function(knex) {
  return knex.schema.createTable("Users",Users=>{
    Users.increments("ID").index();
    Users.string("Username",50).notNullable().index().unique();
    Users.string("Password",255).notNullable();
    Users.string("Email").notNullable();
    Users.datetime("Created_at");
    Users.datetime("Lastconnection_at");
    Users.integer("Goal",4).defaultsTo(2000);
    Users.integer("Role_ID",1)
      .notNullable()
      .references("ID")
      .inTable("Roles")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};

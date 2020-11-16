
exports.up = function(knex) {
  return knex.schema.createTable("users",users=>{
    users.increments("id").index();
    users.string("username",50).notNullable().index().unique();
    users.string("password",255).notNullable();
    users.string("email").notNullable();
    users.datetime("created_at");
    users.datetime("lastconnection_at");
    users.integer("goal",4).defaultsTo(2000);
    users.integer("role_id",1)
      .notNullable()
      .references("id")
      .inTable("roles")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};

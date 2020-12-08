
exports.up = function(knex) {
    return knex.schema.createTable("meals_users", meals_users => {
      meals_users.increments("id").index();
      meals_users.string("type").notNullable().index();
      meals_users.datetime("date").notNullable();
      meals_users.boolean("manual").notNullable(); //Wether it is fully manual or not
      meals_users.jsonb("manual_ingredients")
      meals_users.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("meals_users")
  };
  
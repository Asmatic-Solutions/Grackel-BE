
exports.up = function(knex) {
    return knex.schema.createTable("Meals_Users", Meals_Users => {
      Meals_Users.increments("ID").index();
      Meals_Users.string("Type").notNullable().index();
      Meals_Users.datetime("Date").notNullable();
      Meals_Users.boolean("Manual").notNullable(); //Wether it is fully manual or not
      Meals_Users.jsonb("Manual_Ingredients")
      Meals_Users.integer("User_ID")
      .notNullable()
      .references("ID")
      .inTable("Users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Meals_Users")
  };
  
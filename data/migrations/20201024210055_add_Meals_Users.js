
exports.up = function(knex) {
    return knex.schema.createTable("Meals_Users", Products => {
      Products.integer("ID").index();
      Products.string("Type").notNullable().index();
      Products.date("Date").notNullable();
      Products.jsonb("Manual_Products")
      Products.boolean("Manual").notNullable(); //Wether it is fully manual or not
      Products.integer("User_ID")
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
  
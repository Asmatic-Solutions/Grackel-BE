
exports.up = function(knex) {
    return knex.schema.createTable("Allergen_user",Allergen_user=>{
        Allergen_user.integer("User_ID")
          .notNullable()
          .references("ID")
          .inTable("Users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        Allergen_user.integer("Allergen_ID")
          .notNullable()
          .references("ID")
          .inTable("Allergen")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");

      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Allergen_user");
};

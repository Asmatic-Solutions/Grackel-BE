
exports.up = function(knex) {
  return knex.schema.createTable("Ingredients", Ingredients => {
    Ingredients.integer("ID").index();
    Ingredients.string("Name").notNullable().index();
    Ingredients.string("Category").notNullable();
    Ingredients.jsonb("Nutrition_facts").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Ingredients")
};

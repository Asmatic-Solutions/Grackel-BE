
exports.up = function(knex) {
  return knex.schema.createTable("ingredients", ingredients => {
    ingredients.integer("id").index();
    ingredients.string("name").notNullable().index();
    ingredients.string("category").notNullable();
    ingredients.jsonb("nutrition_facts").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("ingredients")
};

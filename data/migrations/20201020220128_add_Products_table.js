
exports.up = function(knex) {
  return knex.schema.createTable("Products", Products => {
    Products.integer("ID").index();
    Products.string("Name").notNullable().index();
    Products.string("Category").notNullable();
    Products.jsonb("Nutrition_facts").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Products")
};

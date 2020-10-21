
exports.up = function(knex) {
  return knex.schema.createTable("Products", Products => {
    Products.integer("ID").index();
    Products.string("Name",50).notNullable().index();
    Products.string("Category",50).notNullable();
    Products.json("Nutrition_facts").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Products")
};

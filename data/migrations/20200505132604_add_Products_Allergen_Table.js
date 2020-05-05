
exports.up = function(knex) {
    return knex.schema.createTable("Allergen_product",Allergen_product=>{
        Allergen_product.integer("Product_ID")
          .notNullable()
          .references("ID")
          .inTable("Products")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        Allergen_product.integer("Allergen_ID")
          .notNullable()
          .references("ID")
          .inTable("Allergen")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Allergen_product");
};

exports.up = function(knex) {
    return knex.schema.createTable("Allergen",Allergen=>{
        Allergen.integer("ID").index();
        Allergen.string("Name",50).notNullable().index();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Allergen");
};

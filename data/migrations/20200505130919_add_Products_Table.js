
exports.up = function(knex) {
    return knex.schema.createTable("Products",Products=>{
        Products.integer("ID");
        Products.string("Name",50).notNullable().index();
        Products.string("Category",32).notNullable();
        Products.integer("KcalPerG",4);
      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Products");
};

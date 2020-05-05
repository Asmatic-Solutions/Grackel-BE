
exports.up = function(knex) {
    return knex.schema.createTable("Goals",Goals=>{
        Goals.increments("ID").index();
        Goals.integer("Goal",4).notNullable();
        Goals.integer("User_ID")
          .notNullable()
          .references("ID")
          .inTable("Users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Goals")
};

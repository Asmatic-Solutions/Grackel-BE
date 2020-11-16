
exports.up = function(knex) {
    return knex.schema.createTable("roles",roles=>{
        roles.increments("id",1).index();
        roles.string("role",32).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("roles");
};

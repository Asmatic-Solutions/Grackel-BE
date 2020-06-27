
exports.up = function(knex) {
    return knex.schema.createTable("Roles",Roles=>{
        Roles.increments("ID",1).index();
        Roles.string("Role",32).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Roles");
};

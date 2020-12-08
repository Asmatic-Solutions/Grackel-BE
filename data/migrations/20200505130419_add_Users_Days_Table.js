
exports.up = function(knex) {
    return knex.schema.createTable("users_days",users_days=>{
        users_days.integer("user_id")
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        users_days.date("date").notNullable();
        users_days.boolean("success").defaultsTo(true);
        users_days.integer("daily_count",4).defaultsTo(0);
        users_days.primary(["user_id","date"]); //Sets a composite key with Date and GoalID
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users_days")
};

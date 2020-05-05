
exports.up = function(knex) {
    return knex.schema.createTable("User_Days",User_Days=>{
        User_Days.integer("Goal_ID")
          .primary()
          .notNullable()
          .references("ID")
          .inTable("Goals")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        User_Days.date("Date").notNullable();
        User_Days.boolean("Success").defaultsTo(false);
        User_Days.integer("DailyCount",4).notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("User_Days")
};


exports.up = function(knex) {
    return knex.schema.createTable("User_Days",User_Days=>{
        User_Days.integer("User_ID")
          .notNullable()
          .references("ID")
          .inTable("Users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        User_Days.date("Date").notNullable();
        User_Days.boolean("Success").defaultsTo(false);
        User_Days.integer("DailyCount",4).defaultsTo(0);
        User_Days.primary(["User_ID","Date"]); //Sets a composite key with Date and GoalID
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("User_Days")
};

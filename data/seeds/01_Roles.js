
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('Roles').insert([
        {ID: 1, Role: 'Admin'},
        {ID: 2, Role: 'Standar User'},
      ]);
    });
};

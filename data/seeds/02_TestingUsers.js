
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const date = new Date().toISOString();
      return knex('Users').insert([
        {
        "id":1,
        "username":"MrR3set",
        "password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "email":"n@n.com",
        "created_at":date,
        "lastconnection_at":date,
        "role_id":2
        },
        {
        "id":2,
        "isername":"Sarah",
        "password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "email":"n@n.com",
        "created_at":date,
        "lastconnection_at":date,
        "role_id":1
        },
        {
        "id":3,
        "isername":"Joseph",
        "password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "email":"n@n.com",
        "created_at":date,
        "lastconnection_at":date,
        "role_id":2
        },
      ]);
    });
};

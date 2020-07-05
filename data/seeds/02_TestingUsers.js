
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      const date = new Date().toISOString();
      return knex('Users').insert([
        {
        "ID":1,
        "Username":"MrR3set",
        "Password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "Email":"n@n.com",
        "Created_at":date,
        "Lastconnection_at":date,
        "Role_ID":2
        },
        {
        "ID":2,
        "Username":"Sarah",
        "Password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "Email":"n@n.com",
        "Created_at":date,
        "Lastconnection_at":date,
        "Role_ID":1
        },
        {
        "ID":3,
        "Username":"Joseph",
        "Password":"$2b$08$.3a26tb525suKvOTrAvup.sLEkHer6s7S5Y1TZkJ0h7L1ofz7Q9ii",
        "Email":"n@n.com",
        "Created_at":date,
        "Lastconnection_at":date,
        "Role_ID":2
        },



        
      ]);
    });
};

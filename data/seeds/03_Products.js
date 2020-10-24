const products = require("./Assets/Products")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Products').del()
    .then(function () {
      // Inserts seed entries
      return knex('Products').insert(addIDs(products));
    });
};

function addIDs(products){
  let id=1;
  return products.map(product=>{
    return {ID:id++,...product,Nutrition_facts:JSON.stringify(product.Nutrition_facts)}
  })
}
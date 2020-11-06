const Ingredients = require("./Assets/Ingredients")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('Ingredients').insert(addIDs(Ingredients));
    });
};

function addIDs(Ingredients){
  let id=1;
  return Ingredients.map(product=>{
    return {ID:id++,...product,Nutrition_facts:JSON.stringify(product.Nutrition_facts)}
  })
}
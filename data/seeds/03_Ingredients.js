const ingredients = require("./Assets/Ingredients")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert(addIDs(ingredients));
    });
};

function addIDs(ingredients){
  let id=1;
  return ingredients.map(product=>{
    return {id:id++,...product,nutrition_facts:JSON.stringify(product.nutrition_facts)}
  })
}
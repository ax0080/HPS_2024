class FoodItem {
  constructor(doc_id, name, quantity, danger, category, expiration_date, user_defined, in_fridge, image_url) {
    this.doc_id = doc_id;
    this.name = name;
    this.quantity = quantity;
    this.danger = danger;
    this.category = category;
    this.expiration_date = expiration_date;
    this.user_defined = user_defined;
    this.in_fridge = in_fridge;
    this.image_url = image_url;
    // ymin 
    // xmin 
    // ymax 
    // xmax 
    // last_out_fridge_time
  }
}

export default FoodItem;
// module.exports = FoodItem;
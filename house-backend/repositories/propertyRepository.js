const Property = require('../models/Property');

class PropertyRepository {
  async findAll() {
    return await Property.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Property.findById(id);
  }

  async findByAuthorId(authorId) {
    return await Property.find({ authorId }).sort({ createdAt: -1 });
  }

  async create(propertyData) {
    const property = new Property(propertyData);
    return await property.save();
  }

  async update(id, updateData) {
    return await Property.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Property.findByIdAndDelete(id);
  }
}

module.exports = new PropertyRepository();

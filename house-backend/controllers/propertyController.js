const propertyRepository = require('../repositories/propertyRepository');

class PropertyController {
  async getAllProperties(req, res) {
    try {
      const properties = await propertyRepository.findAll();
      
      // We map _id to id so frontend gets standard id field
      const formatted = properties.map(p => ({
        ...p._doc,
        id: p._id
      }));

      res.json(formatted);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve properties' });
    }
  }

  async createProperty(req, res) {
    try {
      const { title, description, price, location, city, country, type, imageUrls, forRent } = req.body;
      
      // Validation could go here
      if (!title || !price) {
        return res.status(400).json({ message: 'Title and price are required' });
      }

      const propertyData = {
        title,
        description,
        price,
        location,
        city,
        country,
        type,
        imageUrls: imageUrls || [],
        forRent: !!forRent,
        authorId: req.user.id
      };

      const property = await propertyRepository.create(propertyData);
      
      res.status(201).json({ ...property._doc, id: property._id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
  }

  async updateProperty(req, res) {
    try {
      const { id } = req.params;
      
      // Ensure the user owns the property before updating
      const property = await propertyRepository.findById(id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      
      if (property.authorId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to edit this property' });
      }

      const updated = await propertyRepository.update(id, req.body);
      res.json({ ...updated._doc, id: updated._id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update property' });
    }
  }

  async deleteProperty(req, res) {
    try {
      const { id } = req.params;
      
      const property = await propertyRepository.findById(id);
      if (!property) return res.status(404).json({ message: 'Property not found' });

      if (property.authorId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this property' });
      }

      await propertyRepository.delete(id);
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete property' });
    }
  }
}

module.exports = new PropertyController();

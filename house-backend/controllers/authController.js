const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

class AuthController {
  async signup(req, res) {
    try {
      const { email, username, password } = req.body;

      // Validation
      if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user via Repository
      const user = await userRepository.create({
        email,
        username,
        password: hashedPassword
      });

      const token = generateToken(user._id);
      
      const userResponse = {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        phone: user.phone
      };

      res.status(201).json({ user: userResponse, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error during signup', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user._id);

      const userResponse = {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        phone: user.phone
      };

      res.json({ user: userResponse, token });
    } catch (error) {
      res.status(500).json({ message: 'Server error during login', error: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await userRepository.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const userResponse = {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        phone: user.phone
      };

      res.json({ user: userResponse });
    } catch (error) {
      res.status(500).json({ message: 'Server error retrieving profile' });
    }
  }

  async updateProfile(req, res) {
    try {
      const { avatar, phone, username } = req.body;
      const updatedUser = await userRepository.update(req.user.id, { avatar, phone, username });
      
      const userResponse = {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone
      };

      res.json({ user: userResponse });
    } catch (error) {
      res.status(500).json({ message: 'Server error updating profile' });
    }
  }

  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await userRepository.findByIdWithPassword(req.user.id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await userRepository.update(req.user.id, { password: hashedPassword });
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error updating password' });
    }
  }
}

module.exports = new AuthController();

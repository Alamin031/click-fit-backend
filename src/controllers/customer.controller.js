const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Customer } = require('../models/customer.entity');
const CustomerService = require('../services/customer.service');
const AuthService = require('../services/auth.service');
const authenticateToken = require('../models/authenticateToken'); // Your authentication middleware

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const customerService = new CustomerService();
    const Customer = await customerService.signup(data);
    res.status(201).json(Customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    const customerDetails = await CustomerService.logino(data.email, data.password);
    if (customerDetails) {
      const token = AuthService.generateToken(customerDetails);
      res.status(200).json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'An error occurred during login' });
  }
});

//show profile
router.get('/profile', async (req, res) => {
  try {
    const customerService = new CustomerService();
    const customerDetails = await customerService.getCustomerDetails(req.customerID);
    res.status(200).json(customerDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Show profile endpoint
router.get('/profilee', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.customerID; 
    const customerProfile = await CustomerService.getCustomerProfile(customerId);

    if (customerProfile) {
      res.status(200).json(customerProfile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
});



module.exports = router;
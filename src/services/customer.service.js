const bcrypt = require("bcrypt");
const { Customer } = require("../models/customer.entity");

class CustomerService {
  async signup(data) {
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const customer = new Customer(data);
      await customer.save();
      return customer;
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  }
  static async logino(email, password) {
    try {
      const customerDetails = await Customer.findOne({ email });

      if (!customerDetails) {
        throw new Error("Your Account Not found. Please Register First");
      }

      const passwordMatch = await bcrypt.compare(
        password,
        customerDetails.password
      );

      if (passwordMatch) {
        return customerDetails;
      } else {
        throw new Error("Password does not match");
      }
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  async getCustomerDetails(customerID) {
    try {
      const customerDetails = await Customer.findById(customerID);
      return customerDetails;
    } catch (error) {
      throw new Error(
        "Error while fetching customer details: " + error.message
      );
    }
  }

  static async getCustomerProfile(customerId) {
    try {
      const customerProfile = await Customer.findOne({ _id: customerId });
      return customerProfile;
    } catch (error) {
      throw new Error("Error fetching customer profile: " + error.message);
    }
  }
}

module.exports = CustomerService;

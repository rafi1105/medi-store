import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, CreditCard, Home as HomeIcon } from 'lucide-react';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledProduct = location.state?.product;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    medicineName: prefilledProduct?.name || '',
    quantity: 1,
    deliveryType: 'Home Delivery',
    paymentMethod: 'Cash on Delivery'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.medicineName.trim()) {
      newErrors.medicineName = 'Medicine name is required';
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log('Order submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleNewOrder = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      address: '',
      medicineName: '',
      quantity: 1,
      deliveryType: 'Home Delivery',
      paymentMethod: 'Cash on Delivery'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="inline-block bg-gradient-to-r from-medical-500 to-accent p-4 rounded-full mb-4"
                >
                  <Package className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Order Confirmation
                </h1>
                <p className="text-gray-600">
                  Fill in the details to complete your order
                </p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                {prefilledProduct && (
                  <div className="bg-medical-50 border-l-4 border-medical-500 p-4 mb-6 rounded-r-lg">
                    <p className="text-sm text-gray-600">Ordering:</p>
                    <p className="font-semibold text-gray-900">{prefilledProduct.name}</p>
                    <p className="text-sm text-medical-600">${prefilledProduct.price}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-200 focus:border-medical-500'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-medical-500'
                      }`}
                      placeholder="+1 234 567 890"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-200 focus:border-medical-500'
                    }`}
                    placeholder="Enter your complete address"
                  ></textarea>
                  {errors.address && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.address}
                    </motion.p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Medicine Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Medicine Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="medicineName"
                      value={formData.medicineName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.medicineName ? 'border-red-500' : 'border-gray-200 focus:border-medical-500'
                      }`}
                      placeholder="e.g., Paracetamol 500mg"
                    />
                    {errors.medicineName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.medicineName}
                      </motion.p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="1"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.quantity ? 'border-red-500' : 'border-gray-200 focus:border-medical-500'
                      }`}
                    />
                    {errors.quantity && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.quantity}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Delivery Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Delivery Type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="Home Delivery"
                          checked={formData.deliveryType === 'Home Delivery'}
                          onChange={handleChange}
                          className="w-5 h-5 text-medical-500"
                        />
                        <span className="flex items-center space-x-2">
                          <HomeIcon className="w-5 h-5 text-medical-500" />
                          <span>Home Delivery</span>
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="Store Pickup"
                          checked={formData.deliveryType === 'Store Pickup'}
                          onChange={handleChange}
                          className="w-5 h-5 text-medical-500"
                        />
                        <span className="flex items-center space-x-2">
                          <Package className="w-5 h-5 text-medical-500" />
                          <span>Store Pickup</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          checked={formData.paymentMethod === 'Cash on Delivery'}
                          onChange={handleChange}
                          className="w-5 h-5 text-medical-500"
                        />
                        <span className="flex items-center space-x-2">
                          <Package className="w-5 h-5 text-medical-500" />
                          <span>Cash on Delivery</span>
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Online Payment"
                          checked={formData.paymentMethod === 'Online Payment'}
                          onChange={handleChange}
                          className="w-5 h-5 text-medical-500"
                        />
                        <span className="flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-medical-500" />
                          <span>Online Payment</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-medical-500 to-accent text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Confirm Order
                </motion.button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block bg-green-100 p-6 rounded-full mb-6"
              >
                <CheckCircle className="w-20 h-20 text-green-600" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Order Confirmed!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 mb-8"
              >
                Thank you for your order! We'll deliver your medicines soon.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={handleNewOrder}
                  className="bg-gradient-to-r from-medical-500 to-accent text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Place Another Order
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-white text-medical-600 px-8 py-3 rounded-lg font-semibold border-2 border-medical-500 hover:bg-medical-50 transition-all duration-300"
                >
                  Back to Home
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderForm;

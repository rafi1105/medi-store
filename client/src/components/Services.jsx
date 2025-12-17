import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, CreditCard } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Home Delivery',
    description: 'Fast and secure delivery to your doorstep within 24 hours',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Expert pharmacist consultation available round the clock',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Medicines',
    description: '100% authentic products sourced directly from manufacturers',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-grade security',
    color: 'from-orange-500 to-red-500'
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-medical-600">MediCare</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional healthcare services with a commitment to quality and customer satisfaction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-medical-500 to-accent rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Need Help? We're Here for You!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Our expert team is available 24/7 to answer your questions and help you find the right medicines
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+1234567890"
              className="bg-white text-medical-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Call: +1 234-567-890
            </a>
            <a
              href="mailto:support@medicare.com"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-medical-600 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

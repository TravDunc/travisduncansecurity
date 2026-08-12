import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Preview widget for the Veterans Resources page
 * Shows a quick overview and link to full calculator
 */
const VACalculatorPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-military-700 to-military-800 rounded-xl p-8 border-2 border-military-600 shadow-2xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-military-600 rounded-lg">
            <Calculator className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">VA Disability Calculator</h3>
            <p className="text-military-200">Calculate your combined rating & monthly pay</p>
          </div>
        </div>
      </div>

      {/* Quick Demo */}
      <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
        <h4 className="text-sm font-semibold text-military-300 mb-3">Quick Example:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">PTSD - 50%</span>
            <span className="text-military-400 font-mono">50%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Knee Injury - 30%</span>
            <span className="text-military-400 font-mono">→ 65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Back Pain - 20%</span>
            <span className="text-military-400 font-mono">→ 73%</span>
          </div>
          <div className="border-t border-military-600 pt-2 mt-2">
            <div className="flex justify-between items-center font-semibold">
              <span className="text-white">Combined Rating:</span>
              <span className="text-gold text-xl">70%</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-white">Monthly Payment:</span>
              <span className="text-gold text-xl">$1,716.28</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-900/30 rounded-lg p-3">
          <p className="text-xs text-military-300 font-semibold mb-1">✓ Interactive Body Diagram</p>
          <p className="text-xs text-gray-400">Click body parts to add conditions</p>
        </div>
        <div className="bg-gray-900/30 rounded-lg p-3">
          <p className="text-xs text-military-300 font-semibold mb-1">✓ Bilateral Factor</p>
          <p className="text-xs text-gray-400">Automatic for paired body parts</p>
        </div>
        <div className="bg-gray-900/30 rounded-lg p-3">
          <p className="text-xs text-military-300 font-semibold mb-1">✓ Dependent Support</p>
          <p className="text-xs text-gray-400">Spouse, children, parents</p>
        </div>
        <div className="bg-gray-900/30 rounded-lg p-3">
          <p className="text-xs text-military-300 font-semibold mb-1">✓ 2025 VA Rates</p>
          <p className="text-xs text-gray-400">Current compensation tables</p>
        </div>
      </div>

      {/* CTA Button */}
      <Link to="/veterans/calculator">
        <button className="w-full py-4 bg-gold hover:bg-gold-light text-gray-900 rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2">
          <span>Launch Full Calculator</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </Link>

      <p className="text-xs text-center text-gray-400 mt-4">
        ⚠️ For estimation purposes only. Consult with VA or VSO for official ratings.
      </p>
    </motion.div>
  );
};

export default VACalculatorPreview;

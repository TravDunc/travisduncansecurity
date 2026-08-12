import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Download, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import BodyDiagram from './BodyDiagram';
import { getBodyPartInfo, getBilateralOpposite, formatBodyPartName } from '../../data/bodyPartMapping';

// Use environment variable for production, fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const VACalculatorFull = () => {
  const [conditions, setConditions] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [rating, setRating] = useState('');
  const [conditionName, setConditionName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dependents state
  const [dependents, setDependents] = useState({
    has_spouse: false,
    children_under_18: 0,
    children_over_18_in_school: 0,
    dependent_parents: 0,
    spouse_aid_attendance: false
  });

  const handleBodyPartClick = (bodyPart, label) => {
    setSelectedBodyPart({ id: bodyPart, label });
    setConditionName(label + ' Condition');
    setShowRatingModal(true);
  };

  const handleAddCondition = () => {
    if (!rating || rating < 0 || rating > 100 || rating % 10 !== 0) {
      setError('Rating must be between 0-100 and a multiple of 10');
      return;
    }

    const newCondition = {
      rating: parseInt(rating),
      name: conditionName ||  selectedBodyPart?.label || 'Condition',
      bodyPart: selectedBodyPart?.id || null,
      id: Date.now()
    };

    setConditions([...conditions, newCondition]);
    setShowRatingModal(false);
    setRating('');
    setConditionName('');
    setSelectedBodyPart(null);
    setError(null);
  };

  const handleRemoveCondition = (id) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const calculateResults = async () => {
    setLoading(true);
    setError(null);

    try {
      // Separate bilateral and non-bilateral conditions
      const bilateralConditions = [];
      const otherConditions = [];
      const processedPairs = new Set();

      conditions.forEach(cond => {
        if (cond.bodyPart) {
          const info = getBodyPartInfo(cond.bodyPart);
          if (info && info.isBilateral) {
            const opposite = getBilateralOpposite(cond.bodyPart);
            const hasPair = conditions.some(c => c.bodyPart === opposite);
            
            if (hasPair) {
              // This is part of a bilateral pair - add it!
              bilateralConditions.push({
                rating: cond.rating,
                name: cond.name,
                body_part: cond.bodyPart
              });
              // Mark this pair type as processed (for tracking only)
              processedPairs.add(info.pairType);
            } else {
              // Single sided, treat as non-bilateral
              otherConditions.push({
                rating: cond.rating,
                name: cond.name
              });
            }
          } else {
            otherConditions.push({
              rating: cond.rating,
              name: cond.name
            });
          }
        } else {
          otherConditions.push({
            rating: cond.rating,
            name: cond.name
          });
        }
      });

      // Determine which API endpoint to use
      let response;
      
      if (bilateralConditions.length >= 2) {
        // Use bilateral calculation
        response = await fetch(`${API_BASE}/api/v1/calculate-bilateral`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY || ''
          },
          body: JSON.stringify({
            bilateral_conditions: bilateralConditions,
            other_conditions: otherConditions,
            dependents
          })
        });
      } else {
        // Use regular full calculation
        const allConditions = conditions.map(c => ({
          rating: c.rating,
          name: c.name
        }));
        
        console.log('Making request to:', `${API_BASE}/api/v1/calculate-full`);
        console.log('Request body:', JSON.stringify({
          conditions: allConditions,
          dependents
        }));
        
        response = await fetch(`${API_BASE}/api/v1/calculate-full`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conditions: allConditions,
            dependents
          })
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        const responseText = await response.text();
        console.log('Raw response body:', responseText);
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          throw new Error(`Invalid response from server: ${responseText}`);
        }
        
        if (!data.success) {
          throw new Error(data.error || 'Calculation failed');
        }

        console.log('About to set result with data:', data);
        console.log('Data has combined_rating:', 'combined_rating' in data);
        console.log('Data has monthly_payment:', 'monthly_payment' in data);
        console.log('Data success status:', data.success);
        
        setResult(data);
        console.log('Result state set successfully');
      }
    } catch (err) {
      console.error('Full error details:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setError(err.message || 'Failed to calculate. Make sure the API server is running.');
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Condition', 'Rating', 'Body Part'];
    
    // Sanitize data to prevent CSV injection
    const sanitizeCell = (cell) => {
      if (typeof cell !== 'string') return cell;
      // Remove dangerous characters that could cause CSV injection
      return cell.replace(/[=+\-@\t\r\n]/g, '').trim();
    };
    
    const rows = conditions.map(c => [
      sanitizeCell(c.name),
      `${c.rating}%`,
      c.bodyPart ? sanitizeCell(formatBodyPartName(c.bodyPart)) : 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `va-disability-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-military-400">VA Disability</span> Calculator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Calculate your combined disability rating and monthly compensation. 
            Click on body parts or add conditions manually.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Body Diagram & Conditions */}
          <div className="space-y-6">
            {/* Body Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BodyDiagram
                onBodyPartClick={handleBodyPartClick}
                selectedParts={conditions}
              />
            </motion.div>

            {/* Manual Entry Button */}
            <button
              onClick={() => {
                setSelectedBodyPart(null);
                setShowRatingModal(true);
              }}
              className="w-full py-3 bg-military-700 hover:bg-military-600 text-white rounded-lg transition-colors font-medium"
            >
              + Add Non-Body Condition (PTSD, Sleep Apnea, etc.)
            </button>

            {/* Conditions List */}
            <div className="bg-gray-800 rounded-xl p-6 border border-military-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-military-400" />
                Selected Conditions ({conditions.length})
              </h3>
              
              {conditions.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No conditions added yet. Click on body parts or add manually.
                </p>
              ) : (
                <div className="space-y-2">
                  {conditions.map((cond) => (
                    <div
                      key={cond.id}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{cond.name}</p>
                        <p className="text-sm text-gray-400">
                          {cond.rating}% 
                          {cond.bodyPart && ` • ${formatBodyPartName(cond.bodyPart)}`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveCondition(cond.id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Dependents & Results */}
          <div className="space-y-6">
            {/* Dependents Form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-military-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Dependents (Optional)
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={dependents.has_spouse}
                    onChange={(e) => setDependents({...dependents, has_spouse: e.target.checked})}
                    className="w-4 h-4 rounded border-gray-600 text-military-600 focus:ring-military-500"
                  />
                  <span className="text-gray-300">Spouse</span>
                </label>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Children Under 18
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dependents.children_under_18}
                    onChange={(e) => setDependents({...dependents, children_under_18: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-military-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Children Over 18 (In School)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={dependents.children_over_18_in_school}
                    onChange={(e) => setDependents({...dependents, children_over_18_in_school: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-military-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Dependent Parents (0-2)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    value={dependents.dependent_parents}
                    onChange={(e) => setDependents({...dependents, dependent_parents: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-military-500"
                  />
                </div>

                {dependents.has_spouse && (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={dependents.spouse_aid_attendance}
                      onChange={(e) => setDependents({...dependents, spouse_aid_attendance: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-600 text-military-600 focus:ring-military-500"
                    />
                    <span className="text-gray-300 text-sm">
                      Spouse Needs Aid & Attendance
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateResults}
              disabled={conditions.length === 0 || loading}
              className="w-full py-4 bg-military-600 hover:bg-military-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-semibold text-lg shadow-lg"
            >
              {loading ? 'Calculating...' : 'Calculate Rating & Payment'}
            </button>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {(() => {
              console.log('Rendering results section, result is:', result);
              return result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-military-700 to-military-800 rounded-xl p-6 border-2 border-gold shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-gold" />
                    Results
                  </h3>
                  <button
                    onClick={downloadCSV}
                    className="p-2 bg-military-600 hover:bg-military-500 rounded-lg transition-colors"
                    title="Download CSV"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Combined Rating</p>
                    <p className="text-4xl font-bold text-white">
                      {result.combined_rating || result.final_rating}%
                    </p>
                  </div>

                  {result.monthly_payment && (
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Monthly Payment</p>
                      <p className="text-4xl font-bold text-gold">
                        ${result.monthly_payment.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Based on 2025 VA compensation rates
                      </p>
                    </div>
                  )}

                  {result.bilateral_factor > 0 && (
                    <div className="bg-gold/10 border border-gold rounded-lg p-3">
                      <p className="text-gold text-sm font-semibold">
                        ⚡ Bilateral Factor Applied: +{result.bilateral_factor}%
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        You have conditions on both sides of your body
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
              );
            })()}

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 text-center">
              <p>⚠️ This calculator is for estimation purposes only.</p>
              <p>Official ratings may vary. Consult with the VA or a VSO for official determinations.</p>
            </div>
          </div>
        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-military-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Add Condition
                {selectedBodyPart && ` - ${formatBodyPartName(selectedBodyPart.id)}`}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Condition Name
                  </label>
                  <input
                    type="text"
                    value={conditionName}
                    onChange={(e) => setConditionName(e.target.value)}
                    placeholder="e.g., PTSD, Knee Pain"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-military-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Rating (0-100, multiples of 10)
                  </label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="e.g., 30"
                    min="0"
                    max="100"
                    step="10"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-military-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowRatingModal(false);
                      setRating('');
                      setConditionName('');
                      setSelectedBodyPart(null);
                    }}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCondition}
                    className="flex-1 py-2 bg-military-600 hover:bg-military-500 text-white rounded-lg transition-colors font-medium"
                  >
                    Add Condition
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VACalculatorFull;

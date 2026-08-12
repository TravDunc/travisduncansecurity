import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

/**
 * Interactive Body Diagram Component
 * Allows users to click on body parts to select conditions
 */
const BodyDiagram = ({ onBodyPartClick, selectedParts = [] }) => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const isSelected = (bodyPart) => {
    return selectedParts.some(part => part.bodyPart === bodyPart);
  };

  const getPartColor = (bodyPart) => {
    if (isSelected(bodyPart)) {
      return '#4a7c59'; // military green (selected)
    }
    if (hoveredPart === bodyPart) {
      return '#6b9b7f'; // lighter military green (hovered)
    }
    return '#67e8f9'; // light cyan/blue (clickable - stands out as interactive)
  };

  const handleBodyPartClick = (bodyPart, label) => {
    if (onBodyPartClick) {
      onBodyPartClick(bodyPart, label);
    }
  };

  // SVG Body Part Components
  const BodyPart = ({ id, label, d, cx, cy, r }) => {
    const isActive = isSelected(id);
    const isHovered = hoveredPart === id;

    return (
      <g
        onMouseEnter={() => setHoveredPart(id)}
        onMouseLeave={() => setHoveredPart(null)}
        onClick={() => handleBodyPartClick(id, label)}
        className="cursor-pointer transition-all duration-200"
        style={{ pointerEvents: 'all' }}
      >
        {d ? (
          <path
            d={d}
            fill={getPartColor(id)}
            stroke={isActive || isHovered ? '#d4af37' : '#1f2937'}
            strokeWidth={isActive || isHovered ? '2' : '1'}
            className="transition-all duration-200"
          />
        ) : (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={getPartColor(id)}
            stroke={isActive || isHovered ? '#d4af37' : '#1f2937'}
            strokeWidth={isActive || isHovered ? '2' : '1'}
            className="transition-all duration-200"
          />
        )}
        
        {/* Selection indicator */}
        {isActive && (
          <circle
            cx={cx || d?.split(',')[0]?.split('M')[1]}
            cy={cy || d?.split(',')[1]}
            r="4"
            fill="#d4af37"
            className="animate-pulse"
          />
        )}
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Help Button */}
      <div className="absolute top-0 right-0 z-10">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 bg-military-700 rounded-lg hover:bg-military-600 transition-colors"
          aria-label="Help"
        >
          <Info className="w-5 h-5 text-military-100" />
        </button>
        
        {/* Help Tooltip */}
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-64 p-4 bg-gray-800 rounded-lg shadow-xl border border-military-500 text-sm"
          >
            <h4 className="font-semibold text-military-300 mb-2">How to Use</h4>
            <ul className="space-y-1 text-gray-300">
              <li>• Click body parts to add conditions</li>
              <li>• Bilateral parts (both sides) get special calculation</li>
              <li>• Selected parts show in <span className="text-military-400">green</span></li>
              <li>• Gold highlight = bilateral pair detected</li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* SVG Body Diagram */}
      <div className="bg-gray-800 rounded-xl p-6 border border-military-700">
        {/* Instructions */}
        <div className="text-center mb-4 p-3 bg-military-900/30 rounded-lg border border-military-700/50">
          <p className="text-sm text-military-200 leading-relaxed">
            <span className="font-semibold text-military-300">How to start:</span> Click the body part that was rated by the VA.
            <br />
            <span className="text-xs text-gray-400 mt-1 inline-block">
              Can't find the right body part? Use the <span className="font-semibold">"Non-Body Condition"</span> button below.
            </span>
          </p>
        </div>

        {/* Label for hovered part */}
        <div className="text-center h-6 mb-2">
          {hoveredPart && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-military-300"
            >
              {hoveredPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </motion.span>
          )}
        </div>

        {/* Simplified SVG Body */}
        <svg
          viewBox="0 0 200 400"
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          {/* Background Elements - Center Line & Labels */}
          {/* Vertical dotted center line */}
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="390"
            stroke="#4b5563"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          
          {/* LEFT label */}
          <text
            x="50"
            y="15"
            textAnchor="middle"
            fontSize="11"
            fill="#9ca3af"
            fontWeight="600"
            letterSpacing="1"
          >
            LEFT
          </text>
          
          {/* RIGHT label */}
          <text
            x="150"
            y="15"
            textAnchor="middle"
            fontSize="11"
            fill="#9ca3af"
            fontWeight="600"
            letterSpacing="1"
          >
            RIGHT
          </text>

          {/* Head */}
          <BodyPart
            id="head"
            label="Head"
            cx="100"
            cy="30"
            r="20"
          />

          {/* Neck */}
          <rect
            x="90"
            y="50"
            width="20"
            height="15"
            fill={getPartColor('neck')}
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredPart('neck')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('neck', 'Neck')}
          />

          {/* Shoulders */}
          <BodyPart
            id="left-shoulder"
            label="Left Shoulder"
            cx="70"
            cy="75"
            r="15"
          />
          <BodyPart
            id="right-shoulder"
            label="Right Shoulder"
            cx="130"
            cy="75"
            r="15"
          />

          {/* Upper Arms - Clickable lines (humerus, etc.) */}
          <line
            x1="70"
            y1="90"
            x2="55"
            y2="140"
            stroke={getPartColor('left-arm')}
            strokeWidth="10"
            strokeLinecap="round"
            onMouseEnter={() => setHoveredPart('left-arm')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('left-arm', 'Left Arm')}
            className="cursor-pointer transition-all duration-200"
            style={{ pointerEvents: 'stroke' }}
          />
          <line
            x1="130"
            y1="90"
            x2="145"
            y2="140"
            stroke={getPartColor('right-arm')}
            strokeWidth="10"
            strokeLinecap="round"
            onMouseEnter={() => setHoveredPart('right-arm')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('right-arm', 'Right Arm')}
            className="cursor-pointer transition-all duration-200"
            style={{ pointerEvents: 'stroke' }}
          />

          {/* Elbows */}
          <BodyPart
            id="left-elbow"
            label="Left Elbow"
            cx="55"
            cy="145"
            r="8"
          />
          <BodyPart
            id="right-elbow"
            label="Right Elbow"
            cx="145"
            cy="145"
            r="8"
          />

          {/* Forearms (elbow to wrist) - Non-clickable visual lines */}
          <line
            x1="55"
            y1="153"
            x2="50"
            y2="175"
            stroke="#6b7280"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <line
            x1="145"
            y1="153"
            x2="150"
            y2="175"
            stroke="#6b7280"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Wrists & Hands */}
          <BodyPart
            id="left-wrist"
            label="Left Wrist"
            cx="50"
            cy="180"
            r="6"
          />
          <BodyPart
            id="right-wrist"
            label="Right Wrist"
            cx="150"
            cy="180"
            r="6"
          />
          <BodyPart
            id="left-hand"
            label="Left Hand"
            cx="50"
            cy="200"
            r="10"
          />
          <BodyPart
            id="right-hand"
            label="Right Hand"
            cx="150"
            cy="200"
            r="10"
          />

          {/* Torso / Back */}
          <rect
            x="75"
            y="65"
            width="50"
            height="80"
            fill={getPartColor('back')}
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredPart('back')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('back', 'Back')}
          />

          {/* Hips - Triangle Shapes (larger for easier clicking) */}
          <BodyPart
            id="left-hip"
            label="Left Hip"
            d="M 70 148 L 85 138 L 94 166 Z"
            cx="83"
            cy="151"
          />
          <BodyPart
            id="right-hip"
            label="Right Hip"
            d="M 130 148 L 115 138 L 106 166 Z"
            cx="117"
            cy="151"
          />

          {/* Thighs - Clickable lines (femur, etc.) */}
          <line
            x1="85"
            y1="160"
            x2="80"
            y2="240"
            stroke={getPartColor('left-thigh')}
            strokeWidth="12"
            strokeLinecap="round"
            onMouseEnter={() => setHoveredPart('left-thigh')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('left-thigh', 'Left Thigh')}
            className="cursor-pointer transition-all duration-200"
            style={{ pointerEvents: 'stroke' }}
          />
          <line
            x1="115"
            y1="160"
            x2="120"
            y2="240"
            stroke={getPartColor('right-thigh')}
            strokeWidth="12"
            strokeLinecap="round"
            onMouseEnter={() => setHoveredPart('right-thigh')}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleBodyPartClick('right-thigh', 'Right Thigh')}
            className="cursor-pointer transition-all duration-200"
            style={{ pointerEvents: 'stroke' }}
          />

          {/* Knees */}
          <BodyPart
            id="left-knee"
            label="Left Knee"
            cx="80"
            cy="245"
            r="10"
          />
          <BodyPart
            id="right-knee"
            label="Right Knee"
            cx="120"
            cy="245"
            r="10"
          />

          {/* Lower Legs - Non-clickable visual lines */}
          <line
            x1="80"
            y1="255"
            x2="75"
            y2="320"
            stroke="#6b7280"
            strokeWidth="10"
          />
          <line
            x1="120"
            y1="255"
            x2="125"
            y2="320"
            stroke="#6b7280"
            strokeWidth="10"
          />

          {/* Ankles */}
          <BodyPart
            id="left-ankle"
            label="Left Ankle"
            cx="75"
            cy="325"
            r="8"
          />
          <BodyPart
            id="right-ankle"
            label="Right Ankle"
            cx="125"
            cy="325"
            r="8"
          />

          {/* Feet */}
          <BodyPart
            id="left-foot"
            label="Left Foot"
            d="M 65 340 L 85 340 L 85 350 L 65 350 Z"
            cx="75"
            cy="345"
          />
          <BodyPart
            id="right-foot"
            label="Right Foot"
            d="M 115 340 L 135 340 L 135 350 L 115 350 Z"
            cx="125"
            cy="345"
          />
        </svg>

        {/* Patient's Perspective Note */}
        <div className="text-center mt-2 mb-2">
          <p className="text-xs text-gray-500 italic">
            (Patient's perspective)
          </p>
        </div>

        {/* Legend */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
            <span>Clickable</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-military-500"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
            <span>Bilateral Pair</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyDiagram;

/**
 * Body Part Mapping for VA Disability Calculator
 * Defines all bilateral body parts and their relationships
 */

export const BILATERAL_PAIRS = {
  shoulders: {
    left: 'left-shoulder',
    right: 'right-shoulder',
    label: 'Shoulder',
    category: 'upper'
  },
  arms: {
    left: 'left-arm',
    right: 'right-arm',
    label: 'Arm',
    category: 'upper'
  },
  elbows: {
    left: 'left-elbow',
    right: 'right-elbow',
    label: 'Elbow',
    category: 'upper'
  },
  wrists: {
    left: 'left-wrist',
    right: 'right-wrist',
    label: 'Wrist',
    category: 'upper'
  },
  hands: {
    left: 'left-hand',
    right: 'right-hand',
    label: 'Hand',
    category: 'upper'
  },
  hips: {
    left: 'left-hip',
    right: 'right-hip',
    label: 'Hip',
    category: 'lower'
  },
  thighs: {
    left: 'left-thigh',
    right: 'right-thigh',
    label: 'Thigh',
    category: 'lower'
  },
  knees: {
    left: 'left-knee',
    right: 'right-knee',
    label: 'Knee',
    category: 'lower'
  },
  ankles: {
    left: 'left-ankle',
    right: 'right-ankle',
    label: 'Ankle',
    category: 'lower'
  },
  feet: {
    left: 'left-foot',
    right: 'right-foot',
    label: 'Foot',
    category: 'lower'
  },
  eyes: {
    left: 'left-eye',
    right: 'right-eye',
    label: 'Eye',
    category: 'head'
  },
  ears: {
    left: 'left-ear',
    right: 'right-ear',
    label: 'Ear',
    category: 'head'
  }
};

export const SINGLE_BODY_PARTS = {
  head: { label: 'Head', category: 'head' },
  neck: { label: 'Neck', category: 'upper' },
  spine: { label: 'Spine', category: 'torso' },
  back: { label: 'Back', category: 'torso' },
  chest: { label: 'Chest', category: 'torso' },
  abdomen: { label: 'Abdomen', category: 'torso' }
};

// Common condition names for quick selection
export const COMMON_CONDITIONS = {
  // Mental Health
  'PTSD': { category: 'mental', bilateral: false },
  'Depression': { category: 'mental', bilateral: false },
  'Anxiety': { category: 'mental', bilateral: false },
  'TBI': { category: 'mental', bilateral: false },
  
  // Physical - Bilateral
  'Knee Pain': { category: 'joint', bilateral: true },
  'Shoulder Injury': { category: 'joint', bilateral: true },
  'Hip Pain': { category: 'joint', bilateral: true },
  'Ankle Injury': { category: 'joint', bilateral: true },
  'Elbow Pain': { category: 'joint', bilateral: true },
  'Wrist Injury': { category: 'joint', bilateral: true },
  
  // Physical - Single
  'Back Pain': { category: 'spine', bilateral: false },
  'Neck Pain': { category: 'spine', bilateral: false },
  'Sleep Apnea': { category: 'respiratory', bilateral: false },
  'Tinnitus': { category: 'sensory', bilateral: false },
  'Hearing Loss': { category: 'sensory', bilateral: false },
  'Migraines': { category: 'neurological', bilateral: false }
};

/**
 * Get the body part pair type from a body part ID
 * @param {string} bodyPartId - e.g., 'left-knee'
 * @returns {object|null} - { pairType: 'knees', side: 'left', label: 'Knee' }
 */
export function getBodyPartInfo(bodyPartId) {
  for (const [pairType, pair] of Object.entries(BILATERAL_PAIRS)) {
    if (pair.left === bodyPartId || pair.right === bodyPartId) {
      const side = bodyPartId.startsWith('left') ? 'left' : 'right';
      return {
        pairType,
        side,
        label: pair.label,
        category: pair.category,
        isBilateral: true
      };
    }
  }
  
  if (SINGLE_BODY_PARTS[bodyPartId]) {
    return {
      id: bodyPartId,
      label: SINGLE_BODY_PARTS[bodyPartId].label,
      category: SINGLE_BODY_PARTS[bodyPartId].category,
      isBilateral: false
    };
  }
  
  return null;
}

/**
 * Check if two body parts form a bilateral pair
 * @param {string} bodyPartId1
 * @param {string} bodyPartId2
 * @returns {boolean}
 */
export function areBilateralPair(bodyPartId1, bodyPartId2) {
  const info1 = getBodyPartInfo(bodyPartId1);
  const info2 = getBodyPartInfo(bodyPartId2);
  
  if (!info1 || !info2 || !info1.isBilateral || !info2.isBilateral) {
    return false;
  }
  
  return info1.pairType === info2.pairType && info1.side !== info2.side;
}

/**
 * Get all body parts that could pair with the given body part
 * @param {string} bodyPartId
 * @returns {string|null} - The opposite side body part ID or null
 */
export function getBilateralOpposite(bodyPartId) {
  const info = getBodyPartInfo(bodyPartId);
  
  if (!info || !info.isBilateral) {
    return null;
  }
  
  const pair = BILATERAL_PAIRS[info.pairType];
  return info.side === 'left' ? pair.right : pair.left;
}

/**
 * Format body part ID to display name
 * @param {string} bodyPartId
 * @returns {string}
 */
export function formatBodyPartName(bodyPartId) {
  const info = getBodyPartInfo(bodyPartId);
  
  if (!info) {
    // Fallback: capitalize and remove hyphens
    return bodyPartId.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  if (info.isBilateral) {
    const side = info.side.charAt(0).toUpperCase() + info.side.slice(1);
    return `${side} ${info.label}`;
  }
  
  return info.label;
}

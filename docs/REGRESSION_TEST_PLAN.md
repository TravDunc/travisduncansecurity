# 🧪 Regression Test Plan - VA Disability Calculator

## 📋 Testing Overview

**Purpose:** Ensure all functionality works correctly after security fixes and documentation reorganization  
**Scope:** Full application testing (frontend + backend)  
**Environment:** Local development (localhost)

---

## 🎯 Test Categories

### 1. 🎨 Frontend UI Tests

#### Body Diagram Functionality
- [ ] **Body part selection:** Click each clickable body part (24 total)
- [ ] **Visual feedback:** Hover effects work, colors change appropriately
- [ ] **Bilateral detection:** Both sides of same body part show gold highlight
- [ ] **Non-clickable parts:** Forearms and lower legs are not clickable
- [ ] **Center line labels:** LEFT/RIGHT labels visible
- [ ] **Patient perspective note:** "(Patient's perspective)" text visible

#### Navigation & Routing
- [ ] **Home page:** Loads at `/` 
- [ ] **Veterans page:** Loads at `/veterans`
- [ ] **Calculator page:** Loads at `/veterans/calculator`
- [ ] **Navbar navigation:** All links work correctly
- [ ] **Browser back/forward:** Navigation history works

#### Responsive Design
- [ ] **Mobile view (<768px):** Body diagram fits, no horizontal scrolling
- [ ] **Tablet view (768px-1024px):** Layout adapts correctly
- [ ] **Desktop view (>1024px):** Full layout displays properly
- [ ] **Touch targets:** Buttons large enough for mobile (44px minimum)

#### Forms & Modals
- [ ] **Condition modal:** Opens, accepts input, validates correctly
- [ ] **Rating validation:** Only accepts 0-100 integers
- [ ] **Condition name validation:** Required field, no empty strings
- [ ] **Non-body condition button:** Opens modal with appropriate defaults

### 2. 🧮 Calculation Logic Tests

#### Basic Calculations
- [ ] **Single condition:** 30% PTSD → 30% combined
- [ ] **Multiple conditions:** 30% + 20% → Correct combined rating
- [ ] **Maximum rating:** 100% total cap enforced
- [ ] **Zero rating:** Edge case handling

#### Bilateral Factor Tests
- [ ] **Both knees:** 20% + 10% → Bilateral factor applied
- [ ] **Both shoulders:** 30% + 20% → Bilateral factor applied  
- [ ] **Mixed bilateral:** Multiple pairs → Correct factor calculation
- [ ] **Single side only:** No bilateral factor applied
- [ ] **Three conditions (2 bilateral + 1 other):** Correct calculation

#### Payment Calculations
- [ ] **Basic payment:** 50% rating → Correct monthly amount
- [ ] **With spouse:** 50% + spouse → Correct additional amount
- [ ] **With children:** 50% + 2 children → Correct amount
- [ ] **Complex dependents:** Spouse + children + parents → Correct calculation
- [ ] **Aid & attendance:** Spouse aid attendance → Correct additional amount

### 3. 🔒 Security Tests

#### Rate Limiting
- [ ] **Normal usage:** 10 requests in 30 seconds → All succeed
- [ ] **Rate limit exceeded:** 15 requests in 30 seconds → 429 responses
- [ ] **Rate limit recovery:** Wait 1 minute → Requests succeed again

#### Input Validation
- [ ] **Invalid rating:** -5%, 105%, "abc" → 400 error responses
- [ ] **Missing fields:** No rating or name → 400 error responses
- [ ] **Malformed JSON:** Invalid JSON syntax → 400 error responses
- [ ] **CSV injection:** Condition names with =,+,-,@ → Sanitized in download

#### Security Headers
- [ ] **CSP headers:** Present and appropriately restrictive
- [ ] **CORS headers:** Correct origins allowed
- [ ] **HSTS header:** Present in production mode

### 4. 📊 Data & Export Tests

#### CSV Download
- [ ] **CSV generation:** Download creates valid CSV file
- [ ] **CSV content:** All conditions included, properly formatted
- [ ] **CSV sanitization:** Dangerous characters removed
- [ ] **CSV filename:** Includes current date in format

#### Data Persistence
- [ ] **Condition list:** Added conditions display correctly
- [ ] **Condition removal:** Delete button removes condition
- [ ] **Clear all:** Reset functionality works
- [ ] **State management:** Page refresh clears state (expected)

### 5. 🌐 Integration Tests

#### API Communication
- [ ] **Health endpoint:** `/health` returns 200 status
- [ ] **Calculate endpoint:** Single condition calculation works
- [ ] **Full calculation endpoint:** Multiple conditions work
- [ ] **Bilateral endpoint:** Bilateral calculations work
- [ ] **Error handling:** API errors display user-friendly messages

#### Error Scenarios
- [ ] **Backend offline:** Frontend shows appropriate error message
- [ ] **Network timeout:** Frontend handles timeout gracefully
- [ ] **Malformed response:** Frontend handles API errors
- [ ] **Empty results:** Edge case handling for no conditions

---

## 📱 Device-Specific Tests

### Mobile Testing
- [ ] **iOS Safari:** All functionality works on iPhone
- [ ] **Android Chrome:** All functionality works on Android
- [ ] **Touch gestures:** Tap, scroll, zoom work correctly
- [ ] **Keyboard input:** Numeric keyboard for ratings

### Browser Testing
- [ ] **Chrome (latest):** Full functionality
- [ ] **Firefox (latest):** Full functionality  
- [ ] **Safari (latest):** Full functionality
- [ ] **Edge (latest):** Full functionality

---

## ✅ Success Criteria

### Must Pass
- All calculation scenarios return correct results
- Bilateral factor detection works for all body parts
- Mobile responsive design works on all tested devices
- Security features (rate limiting, validation) function correctly
- CSV download generates clean, safe files

### Should Pass  
- All UI animations and transitions work smoothly
- Error messages are clear and helpful
- Performance benchmarks met (<2s load time)
- Accessibility standards met (WCAG 2.1 AA)

### Could Pass
- Cross-browser compatibility 100%
- Advanced security monitoring features
- Performance optimization benchmarks

---

## 🐛 Known Issues & Workarounds

### Issue 1: Rate Limiting in Development
**Symptom:** Local testing may trigger rate limits  
**Workaround:** Restart backend server or wait for rate limit reset

### Issue 2: Mobile Keyboard
**Symptom:** Numeric keyboard may not appear on all devices  
**Workaround:** Manual input validation handles non-numeric input

---

## 📊 Test Results Template

```
Date: [Test Date]
Tester: [Your Name]
Environment: Local Development

Frontend Tests: __/24 passed
Backend Tests: __/12 passed  
Security Tests: __/8 passed
Integration Tests: __/6 passed

Overall: __/50 tests passed (__%)

Issues Found:
1. [Description]
2. [Description]

Recommendations:
1. [Action item]
2. [Action item]
```

---

## 🚀 Post-Test Actions

### If All Tests Pass
1. ✅ Ready for production deployment
2. ✅ Documentation updated
3. ✅ Security fixes validated
4. ✅ Proceed to deployment phase

### If Tests Fail
1. ❌ Document failing tests
2. ❌ Prioritize critical issues
3. ❌ Fix and retest
4. ❌ Update documentation as needed

---

**Status:** Ready for Testing  
**Estimated Time:** 2-3 hours  
**Next Phase:** Production Deployment (pending test results)

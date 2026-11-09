import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPhoneForTel,
  formatPhoneDisplay,
  generateWhatsAppLink,
  validateLeadForm,
  calculateSavings,
  filterGalleryItems,
} from './fitnessLogic';

test('formatPhoneForTel formats 10-digit Indian phone with +91', () => {
  assert.equal(formatPhoneForTel('9300849000'), 'tel:+919300849000');
  assert.equal(formatPhoneForTel('93008 49000'), 'tel:+919300849000');
  assert.equal(formatPhoneForTel('+91 93008 49000'), 'tel:+919300849000');
});

test('formatPhoneDisplay formats phone number nicely for UI display', () => {
  assert.equal(formatPhoneDisplay('9300849000'), '+91 93008 49000');
  assert.equal(formatPhoneDisplay('919300849000'), '+91 93008 49000');
});

test('generateWhatsAppLink constructs valid wa.me URL with pre-filled message', () => {
  const url = generateWhatsAppLink(
    '9300849000',
    'Hello Fitness Point! I am interested in joining your gym. Please share your membership plans and details.'
  );
  assert.match(url, /^https:\/\/wa\.me\/919300849000\?text=/);
  assert.ok(url.includes('Hello%20Fitness%20Point'));
  assert.ok(url.includes('membership%20plans'));
});

test('validateLeadForm validates name, 10-digit phone and optional email', () => {
  // Valid case
  const valid = validateLeadForm({
    name: 'Rahul Sharma',
    phone: '9300849000',
    email: 'rahul@example.com',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});

  // Invalid cases
  const invalidName = validateLeadForm({ name: 'R', phone: '9300849000' });
  assert.equal(invalidName.valid, false);
  assert.ok(invalidName.errors.name);

  const invalidPhone = validateLeadForm({ name: 'Rahul', phone: '12345' });
  assert.equal(invalidPhone.valid, false);
  assert.ok(invalidPhone.errors.phone);

  const invalidEmail = validateLeadForm({ name: 'Rahul', phone: '9300849000', email: 'not-an-email' });
  assert.equal(invalidEmail.valid, false);
  assert.ok(invalidEmail.errors.email);
});

test('calculateSavings calculates accurate savings and percentage', () => {
  // Monthly price: 1500, Annual standard = 18000. Actual annual = 13500. Diff = 4500 (25%)
  const savings = calculateSavings(1500, 'annual', 13500);
  assert.equal(savings.percentSaved, 25);
  assert.equal(savings.amountSaved, 4500);

  // Monthly billing cycle has 0 savings
  const monthlySavings = calculateSavings(1500, 'monthly', 1500);
  assert.equal(monthlySavings.percentSaved, 0);
  assert.equal(monthlySavings.amountSaved, 0);
});

test('filterGalleryItems filters by category or preserves all', () => {
  const items = [
    { id: '1', category: 'interior' },
    { id: '2', category: 'equipment' },
    { id: '3', category: 'training' },
  ];

  assert.equal(filterGalleryItems(items, 'all').length, 3);
  assert.equal(filterGalleryItems(items, 'interior').length, 1);
  assert.equal(filterGalleryItems(items, 'equipment')[0].id, '2');
});

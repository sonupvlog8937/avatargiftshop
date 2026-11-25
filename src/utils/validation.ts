import type { CustomerDetails } from '../types';

export type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

export const validateCustomer = (c: CustomerDetails): FormErrors => {
  const errors: FormErrors = {};
  if (c.name.trim().length < 2) errors.name = 'Please enter your full name.';

  const digits = c.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!c.phone.trim()) errors.phone = 'Mobile number is required.';
  else if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit Indian mobile number.';

  if (c.address.trim().length < 8) errors.address = 'Please enter your complete delivery address.';

  if (c.pincode.trim() && !/^\d{6}$/.test(c.pincode.trim())) errors.pincode = 'Pincode must be 6 digits.';
  return errors;
};

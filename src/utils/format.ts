export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const discountPercent = (price: number, salePrice: number) =>
  price > salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

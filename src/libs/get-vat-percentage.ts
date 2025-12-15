export function getVatPercentage(): number {
  const vat = process.env.VAT_PERCENTAGE;
  if (!vat) return 0.2; 
  const num = parseFloat(vat);
  if (isNaN(num)) return 0.2;
  return num;
}

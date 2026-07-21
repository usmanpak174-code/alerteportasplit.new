/**
 * Polar.sh checkout integration
 * Product ID: 0358546f-1871-4769-80e7-dfcb7cddd8ab
 */

// Aap ka Live Product ID
const POLAR_PRODUCT_ID = "0358546f-1871-4769-80e7-dfcb7cddd8ab";

export interface CreateCheckoutResult {
  url: string;
  id: string;
}

export async function createPolarCheckout(opts: {
  email: string;
  planId: string;
  priceId?: string;
  metadata?: Record<string, string>;
}): Promise<CreateCheckoutResult> {
  
  // Vercel ka pakka link (Blink issue hamesha ke liye khatam)
  const APP_URL = "https://alerteportasplit.vercel.app";

  // Direct Checkout Link (Kyunke API token nahi hai)
  // Isme success_url daal diya hai taake payment ke baad seedha Vercel par aaye
  const fallbackUrl = `https://buy.polar.sh/product/${POLAR_PRODUCT_ID}?customer_email=${encodeURIComponent(opts.email)}&success_url=${encodeURIComponent(APP_URL + '/?paid=true')}`;

  return { url: fallbackUrl, id: "placeholder" };
}
/**
 * Polar.sh checkout integration
 * Product ID: 0358546f-1871-4769-80e7-dfcb7cddd8ab
 */

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

const POLAR_PRODUCT_ID = "0358546f-1871-4769-80e7-dfcb7cddd8ab";
const POLAR_API = "https://api.polar.sh";

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

  const APP_URL = "https://alerteportasplit.vercel.app";
  const SUCCESS_URL = `${APP_URL}/?paid=true`;

  if (!POLAR_ACCESS_TOKEN) {
    throw new Error("POLAR_ACCESS_TOKEN is not configured");
  }

  const body: Record<string, unknown> = {
    product_price_id: opts.priceId || POLAR_PRODUCT_ID,
    customer_email: opts.email,
    success_url: SUCCESS_URL,
    metadata: {
      planId: opts.planId,
      ...(opts.metadata ?? {}),
    },
  };

  const res = await fetch(`${POLAR_API}/v1/checkouts/`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${POLAR_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Polar.sh checkout error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { url: string; id: string };
  return { url: data.url, id: data.id };
}

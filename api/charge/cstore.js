import midtransClient from 'midtrans-client';

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-zoBuaM4fOwTDHFi-s4km0YZt',
  clientKey: 'SB-Mid-client-QkCx_W3mUacRh9uG',
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, grossAmount, itemName, gameName, store } = req.body;

    const parameter = {
      payment_type: 'cstore',
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      cstore: {
        store: store,
        message: `${itemName} - ${gameName}`,
      },
      item_details: [{
        id: orderId,
        price: grossAmount,
        quantity: 1,
        name: `${itemName} - ${gameName}`,
      }],
    };

    const chargeResponse = await core.charge(parameter);

    return res.status(200).json({
      status: chargeResponse.transaction_status,
      order_id: chargeResponse.order_id,
      store: store,
      payment_code: chargeResponse.payment_code || '',
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('CStore Error:', error?.ApiResponse || error.message);
    return res.status(500).json({
      error: 'Failed to create convenience store payment',
      details: error?.ApiResponse?.status_message || error.message,
    });
  }
}

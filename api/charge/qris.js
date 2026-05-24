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
    const { orderId, grossAmount, itemName, gameName } = req.body;

    const parameter = {
      payment_type: 'gopay',
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: [{
        id: orderId,
        price: grossAmount,
        quantity: 1,
        name: `${itemName} - ${gameName}`,
      }],
    };

    const chargeResponse = await core.charge(parameter);

    const qrAction = chargeResponse.actions?.find(
      (a) => a.name === 'generate-qr-code'
    );

    return res.status(200).json({
      status: chargeResponse.transaction_status,
      order_id: chargeResponse.order_id,
      qr_url: qrAction?.url || null,
      actions: chargeResponse.actions || [],
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('QRIS Error:', error?.ApiResponse || error.message);
    return res.status(500).json({
      error: 'Failed to create QRIS payment',
      details: error?.ApiResponse?.status_message || error.message,
    });
  }
}

const midtransClient = require('midtrans-client');

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-zoBuaM4fOwTDHFi-s4km0YZt',
  clientKey: 'SB-Mid-client-QkCx_W3mUacRh9uG',
});

module.exports = async function handler(req, res) {
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
    const { orderId, grossAmount, itemName, gameName, bank } = req.body;

    let parameter;

    if (bank === 'mandiri') {
      parameter = {
        payment_type: 'echannel',
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        echannel: {
          bill_info1: 'Payment',
          bill_info2: `${itemName} - ${gameName}`,
        },
        item_details: [{
          id: orderId,
          price: grossAmount,
          quantity: 1,
          name: `${itemName} - ${gameName}`,
        }],
      };
    } else if (bank === 'permata') {
      parameter = {
        payment_type: 'permata',
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
    } else {
      parameter = {
        payment_type: 'bank_transfer',
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        bank_transfer: {
          bank: bank,
        },
        item_details: [{
          id: orderId,
          price: grossAmount,
          quantity: 1,
          name: `${itemName} - ${gameName}`,
        }],
      };
    }

    const chargeResponse = await core.charge(parameter);

    let vaNumber = '';
    if (bank === 'mandiri') {
      vaNumber = chargeResponse.bill_key || '';
    } else if (bank === 'permata') {
      vaNumber = chargeResponse.permata_va_number || '';
    } else {
      const vaNumbers = chargeResponse.va_numbers;
      if (vaNumbers && vaNumbers.length > 0) {
        vaNumber = vaNumbers[0].va_number;
      }
    }

    res.json({
      status: chargeResponse.transaction_status,
      order_id: chargeResponse.order_id,
      bank: bank,
      va_number: vaNumber,
      biller_code: chargeResponse.biller_code || null,
      bill_key: chargeResponse.bill_key || null,
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('Bank Transfer Error:', error?.ApiResponse || error.message);
    res.status(500).json({
      error: 'Failed to create bank transfer payment',
      details: error?.ApiResponse?.status_message || error.message,
    });
  }
};

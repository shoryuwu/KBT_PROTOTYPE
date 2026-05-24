const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Midtrans Core API client — Sandbox mode
const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-zoBuaM4fOwTDHFi-s4km0YZt',
  clientKey: 'SB-Mid-client-QkCx_W3mUacRh9uG',
});

// ─── QRIS / GoPay Payment ────────────────────────────────────────────────────
app.post('/api/charge/qris', async (req, res) => {
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
    console.log('[QRIS] Charge response:', JSON.stringify(chargeResponse, null, 2));

    // Extract QR code URL from actions
    const qrAction = chargeResponse.actions?.find(
      (a) => a.name === 'generate-qr-code'
    );

    res.json({
      status: chargeResponse.transaction_status,
      order_id: chargeResponse.order_id,
      qr_url: qrAction?.url || null,
      actions: chargeResponse.actions || [],
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('QRIS Error:', error?.ApiResponse || error.message);
    res.status(500).json({
      error: 'Failed to create QRIS payment',
      details: error?.ApiResponse || error.message,
    });
  }
});

// ─── Bank Transfer / Virtual Account ─────────────────────────────────────────
app.post('/api/charge/bank-transfer', async (req, res) => {
  try {
    const { orderId, grossAmount, itemName, gameName, bank } = req.body;

    let parameter;

    if (bank === 'mandiri') {
      // Mandiri uses echannel (bill payment)
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
      // BCA, BNI, BRI use bank_transfer
      parameter = {
        payment_type: 'bank_transfer',
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        bank_transfer: {
          bank: bank, // 'bca', 'bni', 'bri'
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
    console.log(`[VA-${bank}] Charge response:`, JSON.stringify(chargeResponse, null, 2));

    // Extract VA number based on bank
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
      biller_code: chargeResponse.biller_code || null, // For Mandiri
      bill_key: chargeResponse.bill_key || null,       // For Mandiri
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('Bank Transfer Error:', error?.ApiResponse || error.message);
    res.status(500).json({
      error: 'Failed to create bank transfer payment',
      details: error?.ApiResponse || error.message,
    });
  }
});

// ─── Convenience Store (Indomaret / Alfamart) ────────────────────────────────
app.post('/api/charge/cstore', async (req, res) => {
  try {
    const { orderId, grossAmount, itemName, gameName, store } = req.body;

    const parameter = {
      payment_type: 'cstore',
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      cstore: {
        store: store, // 'indomaret' or 'alfamart'
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
    console.log(`[CStore-${store}] Charge response:`, JSON.stringify(chargeResponse, null, 2));

    res.json({
      status: chargeResponse.transaction_status,
      order_id: chargeResponse.order_id,
      store: store,
      payment_code: chargeResponse.payment_code || '',
      expiry_time: chargeResponse.expiry_time,
    });
  } catch (error) {
    console.error('CStore Error:', error?.ApiResponse || error.message);
    res.status(500).json({
      error: 'Failed to create convenience store payment',
      details: error?.ApiResponse || error.message,
    });
  }
});

// ─── Check Transaction Status ────────────────────────────────────────────────
app.get('/api/status/:orderId', async (req, res) => {
  try {
    const statusResponse = await core.transaction.status(req.params.orderId);
    res.json(statusResponse);
  } catch (error) {
    console.error('Status Error:', error?.ApiResponse || error.message);
    res.status(500).json({
      error: 'Failed to check status',
      details: error?.ApiResponse || error.message,
    });
  }
});

// ─── Midtrans Notification Webhook ───────────────────────────────────────────
app.post('/api/midtrans-notification', async (req, res) => {
  try {
    const notification = req.body;
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(`[Notification] Order: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      console.log(`✅ Payment success for order ${orderId}`);
    } else if (transactionStatus === 'pending') {
      console.log(`⏳ Payment pending for order ${orderId}`);
    } else {
      console.log(`❌ Payment ${transactionStatus} for order ${orderId}`);
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Notification Error:', error);
    res.status(500).json({ error: 'Failed to process notification' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Midtrans Core API server running at http://localhost:${PORT}`);
  console.log(`   Mode: SANDBOX`);
  console.log(`   Merchant ID: G572133651`);
  console.log('');
  console.log('   Endpoints:');
  console.log('   POST /api/charge/qris          - QRIS payment');
  console.log('   POST /api/charge/bank-transfer  - VA (BCA, BNI, BRI, Mandiri, Permata)');
  console.log('   POST /api/charge/cstore         - Indomaret / Alfamart');
  console.log('   GET  /api/status/:orderId       - Check payment status');
});

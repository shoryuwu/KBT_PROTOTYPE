# Midtrans Payment Server (Sandbox)

Backend server untuk generate Snap token Midtrans.

## Konfigurasi Midtrans

| Key | Value |
|-----|-------|
| Merchant ID | G572133651 |
| Client Key | SB-Mid-client-QkCx_W3mUacRh9uG |
| Server Key | SB-Mid-server-zoBuaM4fOwTDHFi-s4km0YZt |
| Mode | Sandbox |

## Cara Menjalankan

```bash
cd server
npm install
npm start
```

Server akan berjalan di `http://localhost:3001`

## Endpoints

### POST /api/create-transaction
Membuat Snap token untuk pembayaran.

**Request Body:**
```json
{
  "orderId": "ORDER-123456",
  "grossAmount": 19500,
  "itemName": "86 Diamonds",
  "gameName": "Mobile Legends",
  "userId": "123456789",
  "whatsapp": "081234567890"
}
```

**Response:**
```json
{
  "token": "snap-token-xxx",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v4/..."
}
```

### POST /api/midtrans-notification
Webhook untuk menerima notifikasi status pembayaran dari Midtrans.

## Metode Pembayaran yang Tersedia (Sandbox)

- QRIS
- GoPay
- ShopeePay
- Bank Transfer (BCA VA, BNI VA, BRI VA, Permata VA, Mandiri Bill)
- Indomaret
- Alfamart
- Credit Card

## Testing di Sandbox

Gunakan data test dari Midtrans:
- **Credit Card:** 4811 1111 1111 1114 (CVV: 123, Exp: any future date)
- **VA:** Akan generate nomor VA test
- **QRIS:** Scan QR code test yang muncul

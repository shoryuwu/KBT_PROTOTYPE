interface SnapResult {
  order_id: string;
  transaction_status: string;
  payment_type: string;
  gross_amount: string;
  status_code: string;
  [key: string]: any;
}

interface SnapCallbacks {
  onSuccess?: (result: SnapResult) => void;
  onPending?: (result: SnapResult) => void;
  onError?: (result: SnapResult) => void;
  onClose?: () => void;
}

interface Snap {
  pay(token: string, callbacks?: SnapCallbacks): void;
  hide(): void;
}

interface Window {
  snap: Snap;
}

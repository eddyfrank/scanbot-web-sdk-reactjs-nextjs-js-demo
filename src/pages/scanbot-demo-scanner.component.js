import React, { useEffect } from 'react';

function ScanbotDemoScannerComponent({ handleBarcode }) {
  // trial key only valid for localhost!
  const LICENSE_KEY =
      "RgpiQX7q3QfvQpWXa3yj95E6mi+oSK" +
      "csc4KuUhwI7L1UsUswqPZk1pMxMd97" +
      "wvGzmd3L2S7o7WKbKVFVyuIvsH2LKU" +
      "tJo+JW/CH4JCzZoipDX+fqxXKtQ7sl" +
      "q+2cN/7uRqZ6nY6xLOvEDbtVaeMb0b" +
      "mSlTnpKiBhMVJzOxeE7A0WQJGYNXag" +
      "gkCR4z6x9BsPpFn4InTwvnFmvJzkNh" +
      "2L+v5k1M96Oe56NegbsLXU/EAD2+np" +
      "F/aSFLW1p1qPbCNhZMiyyLEImQhjWJ" +
      "XHj+7JF8xnTWLQJFJ0+oxh9K7PeTym" +
      "a9TtHmSr1b/cs0IZPW+QKnWLfeBj1X" +
      "p91PjrKfqpNA==\nU2NhbmJvdFNESw" +
      "psb2NhbGhvc3QKMTY4NTU3NzU5OQo4" +
      "Mzg4NjA3Cjg=\n";

  const startBarcodeScanner = async () => {
    const config = {
      onBarcodesDetected: result => handleBarcode && handleBarcode(`${result.barcodes[0].text} (${result.barcodes[0].format})`),
      containerId: 'barcode-view',
      style: {
        window: {
          aspectRatio: 2.5,
          paddingPropLeft: 0.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      videoConstraints: {
        facingMode: 'environment',
        resizeMode: 'none',
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
        experimental: {
          focusMode: 'continous',
          focusDistance: 0,
        },
      },
      engineMode: 'NEXT_GEN',
      //barcodeFormats: ['EAN_8', 'EAN_13'],
    };

    const sdk = await window.ScanbotSDK.initialize({ licenseKey: LICENSE_KEY, engine: '/' });
    sdk.createBarcodeScanner(config);
  };

  useEffect(() => {
    if (window.ScanbotSDK) {
      startBarcodeScanner();
    } else {
      alert('ERROR: Scanbot SDK JS not loaded (yet)!');
    }
  });

  return (
      <>
        <div id="barcode-view" />
      </>
  );
}

export default ScanbotDemoScannerComponent;

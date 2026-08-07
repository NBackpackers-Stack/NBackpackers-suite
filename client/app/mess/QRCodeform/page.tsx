'use client';

import React from 'react';
import { QRCodeForm } from '../../../component/mess/QRCodeForm';

export default function QRCodeFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <QRCodeForm />
    </div>
  );
}

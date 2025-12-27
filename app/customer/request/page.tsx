"use client";

import { useState } from "react";
import CustomerForm from "@/app/ui/customer/CustomerForm";

export default function CustomerRequestPage() {
  return (
    <main className="page">
      <h1 className="page-title">Permintaan Barang</h1>
      <CustomerForm />
    </main>
  );
}
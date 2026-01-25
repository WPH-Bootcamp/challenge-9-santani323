"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function DetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      
      {/* --- PERBAIKAN LOGO --- */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <img 
          src='/logo_text_read.svg' // Pastikan path benar (biasanya di /public)
          alt="Foody Logo" 
          className="w-50 h-20 object-contain" 
        />
        
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-50">
        
        {/* Dekorasi Perforasi (Titik Potong) - Posisi disesuaikan agar pas di tengah garis putus-putus */}
        <div className="absolute top-[215px] -left-4 w-8 h-8 bg-slate-50 rounded-full z-10 shadow-inner"></div>
        <div className="absolute top-[215px] -right-4 w-8 h-8 bg-slate-50 rounded-full z-10 shadow-inner"></div>

        <div className="p-10">
          {/* Status Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-green-100">
              <CheckCircle className="text-white w-12 h-12" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Payment Success</h1>
            <p className="text-gray-400 text-sm mt-2 text-center leading-relaxed">
              Your payment has been successfully processed.
            </p>
          </div>

          {/* Garis Putus-putus (Sangat Persis di Gambar) */}
          <div className="relative flex items-center mb-8">
            <div className="gflex-grow border-t-2 border-dashed border-gray-100"></div>
          </div>

          {/* Details Section */}
          <div className="space-y-5 text-[15px]">
            <div className="flex justify-between items-start">
              <span className="text-gray-400">Date</span>
              <span className="font-bold text-gray-800 text-right">25 August 2025, 15:51</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-400">Payment Method</span>
              <span className="font-bold text-gray-800 text-right">Bank Rakyat Indonesia</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price (2 items)</span>
              <span className="font-extrabold text-gray-800">Rp100.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Delivery Fee</span>
              <span className="font-extrabold text-gray-800">Rp10.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Service Fee</span>
              <span className="font-extrabold text-gray-800">Rp1.000</span>
            </div>
          </div>

          <div className="my-8 border-t-2 border-gray-50"></div>

          {/* Total Section */}
          <div className="flex justify-between items-center mb-10">
            <span className="text-gray-500 font-semibold text-lg">Total</span>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Rp1.000</span>
          </div>

          {/* Button */}
          <button className="w-full bg-[#C52419] hover:bg-[#A81E15] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-red-100">
            See My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
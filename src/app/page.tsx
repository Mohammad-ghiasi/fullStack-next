import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export default function Page() {


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold">Home welcome</h1>
      </main>
      <Footer />
    </div>
  );
}

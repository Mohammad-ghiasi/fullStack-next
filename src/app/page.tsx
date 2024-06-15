"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface dataType {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export default function Page() {
  const [data, setData] = useState<dataType | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user")
      .then((res) => setData(res.data.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold">Home Welcome</h1>
        {data && (
          <div>
            <p>Id: {data?.id}</p>
            <p>Email: {data?.email}</p>
            <p>Name: {data?.name}</p>
            <p>Phone: {data?.phone}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

"use client"
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<string | null>(null)

  useEffect(() => {
    axios.get("api/posts").then((response: AxiosResponse) => setData(response.data.message))
  }, []);
  console.log(data);
  

  return (
    <>
      <h1>Next.js API Example</h1>
      {data? <p>{data}</p> : <p>loading...</p>}
    </>
  );
}

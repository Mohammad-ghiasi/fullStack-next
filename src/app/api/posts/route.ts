import { data1, dataType } from "@/data/data1";
import { NextRequest, NextResponse } from "next/server";

let allData: dataType[] = data1;

// ****   GET   ****
export async function GET(request: NextRequest) {
  // Extracting the query string from the request URL
  const url: URL = new URL(request.url);
  const params: URLSearchParams = new URLSearchParams(url.search);
  // Extracting the 'id' query parameter
  const id: number | null = Number(params.get("id"));

  if (id) {
    // filtering data by (id)
    let filteredData = allData.find((item: dataType) => item.id === id);

    if (!filteredData) {
      return NextResponse.json({ message: "not fount" }, { status: 404 });
    }
    return NextResponse.json(filteredData, { status: 200 });
  } else {
    return NextResponse.json(allData, { status: 200 });
  }
}

// ****   POST   ****
export async function POST(request: NextRequest) {
  const body: dataType = await request.json();

  // Do something with the request body
  const nowMore = allData.find((item: dataType) => item.id === body.id);
  if (body && !nowMore) {
    allData.push(body);
    return NextResponse.json(body, { status: 200 });
  } else if (!body || nowMore) {
    return NextResponse.json({ massage: "invalid input." }, { status: 200 });
  }
}

// ****   PUT   ****
export async function PUT(request: NextRequest) {
  const body: dataType = await request.json();

  let editedData = allData.map((item: dataType) => {
    if (item.id === body.id) {
      return body
    }else{
      return item
    }
  });
  allData = editedData
  return NextResponse.json(editedData);
}

// ****   DELETE   ****
export async function DELETE(request: NextRequest) {
  const body: dataType = await request.json();

  let deletedData = allData.filter((item: dataType) => item.id !== body.id)
  allData = deletedData
  return NextResponse.json(deletedData);
}

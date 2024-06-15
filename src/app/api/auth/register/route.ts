import { registerBody } from "@/types/registerBody";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const database = new PrismaClient();

// ****   GET   ****
// export async function GET(request: NextRequest) {
//   // Extracting the query string from the request URL
//   const url: URL = new URL(request.url);
//   const params: URLSearchParams = new URLSearchParams(url.search);
//   // Extracting the 'id' query parameter
//   const id: number | null = Number(params.get("id"));

//   if (id) {
//     // filtering data by (id)
//     let post = await database.post.findFirst({
//       where: {
//         id: id,
//       },
//     });
//     if (!post) {
//       return NextResponse.json({ message: "not fount" }, { status: 404 });
//     }
//     return NextResponse.json(post, { status: 200 });
//   } else {
//     const allPosts = await database.post.findMany();
//     return NextResponse.json(allPosts, { status: 200 });
//   }
//   // return NextResponse.json({ message: "GET request" }, { status: 200 });
// }

// ****   POST   ****
export async function POST(request: NextRequest) {
  try {
    const reqBody: registerBody = await request.json();
    

    // form validation.
    if (!reqBody.email || !reqBody.name || !reqBody.passworld) {
      return NextResponse.json(
        { message: "please fill all the fields." },
        { status: 400 }
      );
    }
    // no loged in user.
    const user = await database.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });
    if (user) return NextResponse.json({ message: "user allredy exist." }, { status: 400 });
    // hashing
    const solt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.passworld, solt);
    // add newUser
    const newUser = await database.user.create({
      data: {
        email: reqBody.email,
        name: reqBody.name,
        password: hashedPassword,
        phone: reqBody.phone || '',
      },
    });

    return NextResponse.json({mesage: 'use created successfully', user: newUser}, { status: 201 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Intenal server error" },
      { status: 500 }
    );
  }
}

// ****   PUT   ****
// export async function PUT(request: NextRequest) {
//   const { id, content, title, published } = await request.json();

//   // let editedData = allData.map((item: dataType) => {
//   //   if (item.id === body.id) {
//   //     return body
//   //   }else{
//   //     return item
//   //   }
//   // });
//   let data = await database.post.update({
//     where: {
//       id: id,
//     },
//     data: {
//       title,
//       content,
//       published,
//     },
//   });
//   return NextResponse.json(data, { status: 200 });
// }

// ****   DELETE   ****
// export async function DELETE(request: NextRequest) {
//   const { id } = await request.json();

//   // let deletedData = allData.filter((item: dataType) => item.id !== body.id)
//   // allData = deletedData
//   // return NextResponse.json(deletedData);
//   let post = await database.post.delete({
//     where: {
//       id: id,
//     },
//   });
//   return NextResponse.json(post, { status: 200 });
// }

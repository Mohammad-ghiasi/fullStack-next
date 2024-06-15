import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const database = new PrismaClient();

// ****   GET   ****
export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const token = cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Authorization required" }, { status: 401 });
  }

  
    const decodedToken: any = jwt.verify(token, "my secret");

    const user = await database.user.findFirst({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });

}

// ****   POST   ****
// Uncomment and modify the POST function if needed

// ****   PUT   ****
// Uncomment and modify the PUT function if needed

// ****   DELETE   ****
// Uncomment and modify the DELETE function if needed

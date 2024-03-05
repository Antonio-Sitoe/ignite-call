import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

import { NextResponse, NextRequest } from "next/server";

interface User {
  name: string;
  username: string;
}

export async function GET(request: Request, response: NextResponse) {
}

export async function POST(request: Request, response: Response) {
  const myCookie = cookies();
  try {
    const { name, username } = (await request.json()) as User;
    const userExits = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExits) {
      return new Response("O nome do usuario ja existe", {
        status: 400,
      });
    }
    const user = await prisma.user.create({
      data: {
        name,
        username,
      },
    });

    myCookie.set({
      name: "@ignitecall:userId",
      value: user.id,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return NextResponse.json({
      message: "Usuario " + name + "foi criado com sucesso",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao criar usuario" });
  }
}

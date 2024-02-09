import axiosInstance from "@/services/axiosService";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const resp = await axiosInstance.get("/users");
    return NextResponse.json(resp.data);
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
}

export async function POST(req) {
  const newUser = await req.json();
  try {
    const res = await axiosInstance.post("/users", newUser);
    return NextResponse.json(res.data);
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
}

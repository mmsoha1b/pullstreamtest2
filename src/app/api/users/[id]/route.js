import axiosInstance from "@/services/axiosService";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return NextResponse.json(res.data);
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
}
export async function PATCH(req, { params }) {
  const { id } = params;
  const newData = await req.json();
  try {
    const res = await axiosInstance.patch(`/users/${id}`, newData);
    return NextResponse.json(res.data);
  } catch (err) {
    throw new NextResponse("Error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAllPosts, getAllTags } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return NextResponse.json({ posts, tags });
}

import { posts } from "@/data/post";

// En Next 15+, params es una Promise y hay que hacerle await
type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return Response.json({ error: "Post no encontrado" }, { status: 404 });
  }
  return Response.json(post);
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params;
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || typeof body.content !== "string") {
    return Response.json({ error: "Title y content deben ser strings" }, { status: 400 });
  }

  posts[index] = { ...posts[index], title: body.title, content: body.content };
  return Response.json(posts[index]);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json({ error: "Post no encontrado" }, { status: 404 });
  }

  posts.splice(index, 1);
  return new Response(null, { status: 204 });
}
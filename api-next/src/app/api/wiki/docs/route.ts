import { posts } from "../../../../data/post"

// Get de los Docs ===========

export function GET() {
  return Response.json(posts);
}

// Get por ID de los Docs =========



// Post de los Docs =============

export async function POST(request: Request) {

    const body = await request.json();

    if ( typeof body.title !== "string" || typeof body.content !== "string" ) {

        return Response.json(
            { error: "Title y content deben ser strings"},
            { status: 400 }
        )
    }

    const newPost = {
        id: posts.length + 1,
        title: body.title,
        content: body.content
    };

    posts.push(newPost);

    return Response.json( newPost, { status: 201 } );
}

// 
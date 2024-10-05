export async function GET(request: Request) {
    return new Response('<!DOCTYPE html><html><body style="background-color: green"></body></html>', { status: 200 });
  }
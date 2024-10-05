export async function GET() {
    return new Response(
        '<!DOCTYPE html><html><body style="background-color: green"></body></html>',
        { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
}

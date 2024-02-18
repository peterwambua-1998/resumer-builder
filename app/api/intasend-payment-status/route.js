import IntaSend from "intasend-node";

export async function POST(req, res) {
    try {
        let intasend = new IntaSend(
            process.env.NEXT_INTASEND_PUBLIC_KEY,
            process.env.NEXT_INTASEND_PRIVATE_KEY,
            true
        );
        let collection = intasend.collection();
        let status = await collection.status('R0DD38Y');
        return new Response(JSON.stringify(status));
    } catch (error) {
        return new Response(error)
    }
    
}
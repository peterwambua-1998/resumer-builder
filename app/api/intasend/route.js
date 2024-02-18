import IntaSend from "intasend-node";

export async function POST(req, res) {
    try {
        let intasend = new IntaSend(
            process.env.NEXT_INTASEND_PUBLIC_KEY,
            process.env.NEXT_INTASEND_PRIVATE_KEY,
            true
        );
        
        let collection = intasend.collection();
        let initiate  = await collection.charge({
            first_name: 'Joe',
            last_name: 'Doe',
            email: 'joe@doe.com',
            host: 'http://localhost:3000/',
            amount: 10,
            currency: 'KES',
            api_ref: 'test',
            redirect_url:'http://localhost:3000/dashboard/subscription/'
        })
        return new Response(JSON.stringify(initiate));
    } catch (error) {
        return new Response(error)
    }
    
}
import OpenAI from "openai";
import { config } from "dotenv";
config();
export const dynamic = 'force-dynamic' 

const ResumeAi = async () => {
    console.log(process.env);
    //const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    console.log(process.env.NEXT_EDEN_AI_KEY);
    console.log(process.cwd());

    // const completion = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{
    //         role: 'user', content: 'make me ann about me for a resume i am applying for system admin role'
    //     }]
    // });

    // return completion.choices[0].message.content;
}
 
export default ResumeAi;


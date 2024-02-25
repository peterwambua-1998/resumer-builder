import OpenAI from "openai";

export async function POST(req) {
   // get user job desc and skills
   let reqBody = await req.json();
   let { jobDescription } = reqBody;
   let responseAbout = [
      { id: 1, checked: false, about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore esse deleniti ad possimus, molestiae accusamus numquam in minima culpa soluta mollitia, aut sed eveniet quaerat? Dolorem soluta eaque eius voluptate" },
      { id: 2, checked: false, about: "AI-Assisted Learning Get coding help quickly and when you need it to speed up your learning journey. Our AI features help you understand errors and solution code faster and get personalized feedback." }
   ];
   let responseSkills = [
      { id: 1, skill: 'dancing', checked: false },
      { id: 2, skill: 'playing', checked: false },
      { id: 3, skill: 'singing', checked: false }
   ];
   let res = JSON.stringify({about:responseAbout, skills:responseSkills});
   try {
      return new Response(res, {status: 200});
   } catch (error) {
      return new Response('error occurred please try again',{status: 500})
   }
}

// export async function POST(req, res) {
//    // get user job desc and skills
//    let reqBody = await req.json();
//    let { jobDescription, skills } = reqBody;

//    if (!jobDescription || jobDescription == null) {
//       return Response('job description not included',{status: 400})
//    }

//    if (!skills || skills == null) {
//       return Response('skills not included',{status: 400})
//    }

//    const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//    try {
//       const completion = await openAi.chat.completions.create({
//          model: 'gpt-3.5-turbo',
//          messages: [
//             {role: "system", content: "You are going to generate resume content from now on"},
//             {role: 'user', content: `make me an about me for a resume i am applying jo description is ${jobDescription} and here are my skills ${skills}` }
//          ]
//       });
   
//       return new Response(completion.choices[0].message.content, {status: 200});
//    } catch (error) {
//       return new Response('error occurred please try again',{status: 500})
//    }
   
// }



// import fs, { existsSync } from 'fs';
// import url from 'url';
// //import fetch from 'node-fetch';

// // "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/users%2FCURRICULUM%20VITAE%20(CV)-%20Peter%20Wambua.docx?alt=media&token=3295b8bf-0f72-4164-bd0f-e230039f8d3b"

// export async function POST(req, res) {
   
//    const url = 'https://api.edenai.run/v2/ocr/resume_parser';
//    const options = {
//       method: 'POST',
//       headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`},
//       body: JSON.stringify({
//          response_as_dict: true,
//          attributes_as_list: false,
//          show_original_response: false,
//          convert_to_pdf: false,
//          providers: 'affinda,hireability',
//          file_url: "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/user%2FVRmkj5XwI5gJ1fWxm5UKSAgHsHJ3?alt=media&token=5d9810ad-e457-4e6d-9fa9-8b88f5107b84"
//       })
//    };

//    let d = await fetch(url, options);
//    let reszz = await d.json();
//    console.log(reszz);
//    return new Response(reszz);
   
// }


// export async function POST(req, res) {
//    // const url = 'https://api.edenai.run/v2/ocr/resume_parser';
//    // const options = {
//    //    method: 'POST',
//    //    headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`},
//    //    body: JSON.stringify({
//    //       response_as_dict: true,
//    //       attributes_as_list: false,
//    //       show_original_response: false,
//    //       convert_to_pdf: false,
//    //       providers: 'affinda,hireability',
//    //       file_url: "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/user%2FVRmkj5XwI5gJ1fWxm5UKSAgHsHJ3?alt=media&token=5d9810ad-e457-4e6d-9fa9-8b88f5107b84"
//    //    })
//    // };

//    // let d = await fetch(url, options);
//    // let reszz = await d.json();
//    // console.log(reszz);\
//    const body  = await req.json();
//    console.log(body['data']);
//    return new Response(body['data']);
   
// }





// // export async function GET(req, res) {
// //    //C:\Users\pwamb\Documents\next-js-projects\resume-builder
// //    console.log(process.cwd());
// //    let file = process.cwd() + '\\app\\images\\resume.docx';
// //    // fs.readFile(file, (d, md) => {
// //    //    console.log(md);
// //    // });
// //    const data = new FormData();
// //    data.append('providers','affinda');
// //    data.append('file',fs.createReadStream(file));
   
// //     let options = {
// //         method: 'POST',
// //         headers: {
// //             'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`,
// //             'Content-Type':  `multipart/form-data; boundary=${data}`
// //         },
// //         body: data,
// //     };
// //    let response = await fetch('https://api.edenai.run/v2/ocr/resume_parser', options);
// //    let result = process.env;
// //    let text = await response.text();
// //    console.log(response.status);
// //    return new Response(text);
// //    res.status(200).json({ 'peter':'peter' });
// // }

// // export async function GET() {
// //    let file = process.cwd() + '\\app\\images\\resume.docx';
// //    let mUrl = url.pathToFileURL(file);
// //    const uri = 'https://api.edenai.run/v2/ocr/resume_parser';
// //    const options = {
// //    method: 'POST',
// //    headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`,},
// //    body: JSON.stringify({
// //       response_as_dict: true,
// //       attributes_as_list: false,
// //       show_original_response: false,
// //       convert_to_pdf: false,
// //       providers: 'senseloaf,affinda,klippa,hireability',
// //       file_url: fs.createReadStream(file)
// //    })
// //    };

// //    fetch(uri, options)
// //    .then(res => res.json())
// //    .then(json => console.log(json))
// //    .catch(err => console.error(err));
// //    return new Response(mUrl);

// // }
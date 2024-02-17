// export default function handler(req, res) {
//   const {method} = req;

//    let result = process.env
//    res.status(200).json({ result })
// }
import fs, { existsSync } from 'fs';
import url from 'url';
//import fetch from 'node-fetch';
import fetch from 'node-fetch';

// "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/users%2FCURRICULUM%20VITAE%20(CV)-%20Peter%20Wambua.docx?alt=media&token=3295b8bf-0f72-4164-bd0f-e230039f8d3b"

export async function GET(req, res) {
   
   const url = 'https://api.edenai.run/v2/ocr/resume_parser';
   const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`},
      body: JSON.stringify({
         response_as_dict: true,
         attributes_as_list: false,
         show_original_response: false,
         convert_to_pdf: false,
         providers: 'affinda,hireability',
         file_url: "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/user%2FVRmkj5XwI5gJ1fWxm5UKSAgHsHJ3?alt=media&token=5d9810ad-e457-4e6d-9fa9-8b88f5107b84"
      })
   };

   let d = await fetch(url, options);
   let reszz = await d.json();
   console.log(reszz);
   return new Response(reszz);
   
}


export async function POST(req, res) {
   // const url = 'https://api.edenai.run/v2/ocr/resume_parser';
   // const options = {
   //    method: 'POST',
   //    headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`},
   //    body: JSON.stringify({
   //       response_as_dict: true,
   //       attributes_as_list: false,
   //       show_original_response: false,
   //       convert_to_pdf: false,
   //       providers: 'affinda,hireability',
   //       file_url: "https://firebasestorage.googleapis.com/v0/b/ai-app-49d1e.appspot.com/o/user%2FVRmkj5XwI5gJ1fWxm5UKSAgHsHJ3?alt=media&token=5d9810ad-e457-4e6d-9fa9-8b88f5107b84"
   //    })
   // };

   // let d = await fetch(url, options);
   // let reszz = await d.json();
   // console.log(reszz);\
   const body  = await req.json();
   console.log(body['data']);
   return new Response(body['data']);
   
}





// export async function GET(req, res) {
//    //C:\Users\pwamb\Documents\next-js-projects\resume-builder
//    console.log(process.cwd());
//    let file = process.cwd() + '\\app\\images\\resume.docx';
//    // fs.readFile(file, (d, md) => {
//    //    console.log(md);
//    // });
//    const data = new FormData();
//    data.append('providers','affinda');
//    data.append('file',fs.createReadStream(file));
   
//     let options = {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`,
//             'Content-Type':  `multipart/form-data; boundary=${data}`
//         },
//         body: data,
//     };
//    let response = await fetch('https://api.edenai.run/v2/ocr/resume_parser', options);
//    let result = process.env;
//    let text = await response.text();
//    console.log(response.status);
//    return new Response(text);
//    res.status(200).json({ 'peter':'peter' });
// }

// export async function GET() {
//    let file = process.cwd() + '\\app\\images\\resume.docx';
//    let mUrl = url.pathToFileURL(file);
//    const uri = 'https://api.edenai.run/v2/ocr/resume_parser';
//    const options = {
//    method: 'POST',
//    headers: {accept: 'application/json', 'content-type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_EDEN_AI_KEY}`,},
//    body: JSON.stringify({
//       response_as_dict: true,
//       attributes_as_list: false,
//       show_original_response: false,
//       convert_to_pdf: false,
//       providers: 'senseloaf,affinda,klippa,hireability',
//       file_url: fs.createReadStream(file)
//    })
//    };

//    fetch(uri, options)
//    .then(res => res.json())
//    .then(json => console.log(json))
//    .catch(err => console.error(err));
//    return new Response(mUrl);

// }
'use client'
import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { profileGlobal } from "../helpers/helpers";


const GeneratePDF = ({userId}) => {
    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);

    function getProfile() {
        let profData = profileGlobal(userId);
        setProfile(profData);
    }

    useEffect(() => {
        getProfile();
    }, []);

    function downloadPDF() {
        console.log(profile);
    }

//     function downloadPDF() {
//         setMDownload(true);
//         const template = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
//     <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
// </head>
// <body>
//     <div class="container">
//         <div class="row">
//             <div class="col-md-3" style="background-color: slategray; color: white;">
//                 <div class="text-center">
//                     <img src="${profile.file_url}"  alt="" style="border-radius: 50%; width: 120px; height: 120px;">
//                 </div>
//                 <div  style="display: flex; flex-direction: column; margin-top: 18px;">
//                     <div >
//                         <table style="margin-bottom: 14px;">
//                             <tbody>
//                                 <td>icon</td>
//                                 <td><p style="font-size: 14px;">${profile.phoneNumber}</p></td>
//                             </tbody>
//                         </table>
//                         <table style="margin-bottom: 14px;">
//                             <tbody>
//                                 <td>icon</td>
//                                 <td><p style="font-size: 14px;">${profile.email}</p></td>
//                             </tbody>
//                         </table>
//                         <table style="margin-bottom: 14px;">
//                             <tbody>
//                                 <td>icon</td>
//                                 <td><p style="font-size: 14px;">${profile.location}</p></td>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <!-- skills -->
//                 <div style="margin-bottom: 20px; padding: 8px;">
//                     <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Skills</p>
//                     <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
//                         <ul>`;
// let skills = [];
// skills.map((skill,index) => { 
// template += `
//         <li  key={index}>${skill.skill}</li>
// `;
// });

// template+=  `
//                         </ul>
//                     </div>
//                 </div>
//                 <!-- skills -->
//                 <!-- skills -->
//                 <div style="margin-top: 12px; padding: 8px;">
//                     <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Awards</p>`;



// let awards = [];
// awards.map((award,index) => { 
// template+=   `
// <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 24px;" key={index}>
//     ${award.award}
// </p>
// `;
// });
     


// template+=  `
//                 </div>
//                 <!-- skills -->
//                 <!-- membership -->

//                 <div style="margin-bottom: 20px; padding: 8px;">
//                     <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Membership</p>
//                     <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
//                         <ul>`;

// let memberships = [];
// memberships.map((membership,index) => { 
// template+=   `
//     <li key={index}>${membership.organization}</li>
// `;
// });



                            
// template+= `
//                         </ul>
//                     </div>
//                 </div>
//                 <!-- membership -->

//                 <div style="margin-top: 12px; padding: 8px;">
//                     <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Languages</p>
                    
//                         `;
  
// let languages = [];
// languages.map((language,index) => { 
// template+=   `
// <div key={index}>
//     <p style="padding-left: 20px; padding-right: 20px; font-weight: bold; font-size: 16px;">Languages</p>
//     <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 14px;">
//         english
//     </p>
// </div>
// `;
// });

                        
// template += `
//                 </div>
//             </div>
//             <!-- grid col 9 -->
//             <div class="col-md-9" style="padding:3%;">
//                 <p style="font-weight: bold; font-size: 30px; line-height: 36px; color: #4d7c0f;">${profile.full_name}</p>
//                 <!-- about -->
//                 <div style="padding: 20px;">
//                     <p  style="font-weight: bold; font-size: 1.125rem; border-bottom: 2px solid #22c55e;">About</p>
//                     <p style="margin-top: 0.75rem; font-size: 1rem; line-height: 1.5rem;">
//                         ${about}
//                     </p>
//                 </div>
//                 <!-- about -->

//                 <!-- education -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Education</p>
//                     `;

// let education = [];
// education.map((edu, index) => {
// template+=  `
// <div style="display: flex; color: black;" key={index}>
//     <div style="margin-bottom: 2rem;">
//         <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${edu.degree}, ${edu.fieldStudy}</p>
//         <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${edu.school} (${edu.startDate} - ${edu.endDate})</p>
//         <div style="font-size: 0.875rem; line-height: 1.25rem;">
//             <p>${edu.descriptionEdu}</p>
//         </div>
//     </div>
// </div>
// `;
// });


// template+=  `
                    
//                 </div>
//                 <!-- education -->

//                 <!-- experience -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Experience</p>
//                     `;


// let experiences = [];
// experiences.map((exp,index) => {
// template+= `
// <div style="display: flex; color: black;">
//     <div style="margin-bottom: 2rem;">
//         <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${exp.title}, ${exp.companyName}</p>
//         <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
//         <div style="font-size: 0.875rem; line-height: 1.25rem;">
//             <p>${exp.description}</p>
//         </div>
//     </div>
// </div>
// `;
// });



// template+=   `
//                 </div>
//                 <!-- experience -->

//                 <!-- Internship -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Internship</p>
//                     <div style="display: flex; color: black;">
//                     `;


// let internships = [];
// internships.map((internship, index) => {               
// template+=  `
// <div style="margin-bottom: 2rem;">
//     <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${internship.organization}, ${internship.role}</p>
//     <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
//     <div style="font-size: 0.875rem; line-height: 1.25rem;">
//         <p>${internship.description}</p>
//     </div>
// </div>
// `;
// });

                        
// template +=`
//                     </div>
//                 </div>
//                 <!-- Internship -->

//                 <!-- Publications -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Publications</p>
//                     <div style="display: flex; color: black;">
//                     `;



// var publications = [];
// publications.map((publication, index) => {               
// template+= `
// <div style="margin-bottom: 2rem;" key={index}>
//     <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${publication.title}</p>
    
//     <div style="font-size: 0.875rem; line-height: 1.25rem;">
//         <p>${publication.link}</p>
//     </div>
// </div>
// `;
// });


                        
// template+=`
//                     </div>
//                 </div>
//                 <!-- Publications -->

//                 <!-- Links -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Links</p>
//                     <div style="display: flex; color: black;">
//                     `;
 
                    
// var links = [];
// links.map((link, index) => {
// template+= `
// <div style="margin-bottom: 2rem;">
//     <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${link.name}</p>
    
//     <div style="font-size: 0.875rem; line-height: 1.25rem;">
//         <p>${link.link}</p>
//     </div>
// </div>
// `;
// });


                        
// template +=`
//                     </div>
//                 </div>
//                 <!-- Links -->

//                 <!-- references -->
//                 <div style="padding: 1.25rem;">
//                     <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">References</p>
//                     <div style="font-size: 1rem; line-height: 1.5rem; display: flex; gap: 5rem; padding: 2.5rem;">
//                     `;
                    
// template+= `
// <div>
//     <p style="font-weight: bold; color: #22c55e;">${refrence.referee_name}</p>
//     <p>${refrence.organization}</p>
//     <p>${refrence.role}</p>
//     <p>${refrence.email}</p>
//     <p>${refrence.phone}</p>
// </div>
// `;
                        
// template += `
//                     </div>
//                 </div>
//             </div>
//             <!-- references -->

//             <!-- grid col 9 -->
//         </div>
//     </div>

//     <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
// </body>
// </html>
// `;
//     }
    return (  
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            download pdf
        </Button>
    );
}
 
export default GeneratePDF;
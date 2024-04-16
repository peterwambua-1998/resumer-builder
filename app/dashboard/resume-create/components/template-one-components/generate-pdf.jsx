'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";
import dummyPhoto from '@/app/images/photo.avif';

const PdfGenerationTemplateOne = ({ userId, aboutAI, skillsAi }) => {


    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState(skillsAi);
    const [awards, setAwards] = useState(null);
    const [memberships, setMemberships] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [education, setEducation] = useState(null);
    const [experiences, setExperience] = useState(null);
    const [internships, setInternships] = useState(null);
    const [publications, setPublications] = useState(null);
    const [links, setLinks] = useState(null);
    const [references, setReferences] = useState(null);
    const [about, setAbout] = useState(aboutAI);
    const [projects, setProjects] = useState(null);
    const [hobbies, setHobbies] = useState(null);

    async function getData() {
        let profData = await profileGlobal(userId);
        setProfile(profData);

        let awardsData = await awardsGlobal(userId);
        setAwards(awardsData);

        let membershipsData = await membershipsGlobal(userId);
        setMemberships(membershipsData);

        let languagesData = await languagesGlobal(userId);
        setLanguages(languagesData);

        let educationData = await educationGlobal(userId);
        setEducation(educationData);

        let experiencesData = await experiencesGlobal(userId);
        setExperience(experiencesData);

        let internshipsData = await internshipsGlobal(userId);
        setInternships(internshipsData);

        let publicationsData = await publicationsGlobal(userId);
        setPublications(publicationsData);

        let linksData = await linksGlobal(userId);
        setLinks(linksData);

        let projectsData = await projectsGlobal(userId);
        setProjects(projectsData);

        let hobbiesData = await hobbiesGlobal(userId);
        setHobbies(hobbiesData);

        let referencesData = await referencesGlobal(userId);
        setReferences(referencesData);
    }

    useEffect(() => {
        getData();
    }, []);

    async function downloadPDF() {
        // check if user has subscription
        setMDownload(true);
        let subDoc = await getDoc(doc(db, 'subscriptions', userId));
        // take user to subscription page to begin payment
        if (subDoc.exists() == false) {
            return router.replace('/dashboard/subscription');
        }

        // get profile data 
         // get profile data 
         let template = `
         <!DOCTYPE html>
         <html lang="en">
 
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1">
             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                 integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
             <title>Document</title>
             <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
             <style>
                 .dashed-text-container {
                     display: flex;
                     align-items: center;
                 }
 
                 .dashed-line {
                     flex: 1;
                     height: 1px;
                     background: #f59e0b;
                     margin: 0 10px;
                 }
 
                 .dashed-text {
                     white-space: nowrap;
                     /* Prevent text from wrapping */
                 }
 
                 .wrapper {
                     color: white !important;
                 }
             </style>
         </head>
         <body>
             <div class="wrapper">
                 <!-- top blue area -->
                 <div style="background-color: #1e1b4b;">
                     <p style="font-size: 30px; font-weight:bold; margin-bottom: 0.5rem;" class="text-center">${profile.full_name}</p>
                     <div class="dashed-text-container" style="width: 100%; margin-bottom: 0.8rem;">
                         <div class="dashed-line"></div>
                         <span class="dashed-text ml-3 mr-3"
                             style="font-weight:bold; font-size: 18px;">${profile.professionTitle}</span>
                         <div class="dashed-line"></div>
                     </div>
 
                     <!-- icons and text -->
                     <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; justify-content: space-around;">
                        <div style="display:flex; flex-direction: column; gap: 2px;">
                            

                            <svg style="width: 16%; height: 16%; display: block; margin: 0 auto; padding-top: 0.3%; padding-bottom: 0px; fill:#f59e0b" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 522 522"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
                            </svg>
                             <p style="font-size: 12px;">${profile.location}</p>
                        </div>
                        <div  style="display:flex; flex-direction: column; gap: 2px;">
                            <svg
                            style="width: 16%; height: 16%; display: block; margin: 0 auto; padding-top: 0.3%; padding-bottom: 0px; fill:#f59e0b" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 522 522"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                            </svg>
                            <p style="font-size: 12px;">${profile.email}</p>
                        </div>
                        <div style="display:flex; flex-direction: column; gap: 2px;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16%; height: 16%; display: block; margin: 0 auto; padding-top: 0.3%; padding-bottom: 0px; fill:#f59e0b"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                            <p style="font-size: 12px;">${profile.phoneNumber}</p>
                        </div>
                    </div>
                    <!-- icons and text -->
 
                 </div>
                 <!-- top blue area -->
                 <div class="row" style="color: black;">
                     <div class="col-md-3 text-center">`
                     if (profile.file_url) {
                         template+=`
                             <img src="${profile.file_url}" alt="" srcset="" style="width: 120px; height: 120px;">
                         `;
                     } else {
                         template+=`
                             <img src="${dummyPhoto}" alt="" srcset="" style="width: 120px; height: 120px;">
                         `;
                     }
                     
                         
                     template+=`
                     </div>
                     <div class="col-md-9">
                         <p style="font-size: 20px; font-weight: bold;">Profile</p>
                         <p style="font-size: 14px;">`
                         about
                         .filter((ab) => ab.checked === true)
                         .map((ab) => (
                             template += `
                                     ${ab.about}
                                 `
                         ));
                         template+=`
                         </p>
                     </div>
                 </div>
                 <!-- profile photo -->
                 <div class="row" style="color: black;">
                     <div class="col-md-3 p-0 " style="border-right: 1px solid #f59e0b; color: white;">
                         <!-- skills -->`
                         template+=`
                         <div>
                             <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Skills</p>
                             <div class="text-center" style="color: black;">
                                 <!-- loop -->`
                                 skills.filter((skill) => skill.checked === true)
                                 .map((skill, index) => {
                                     template += `
                                         <p>${skill.skill}</p>
                                     `;
                                 });
 
                         template += `
                                 <!-- loop -->
                             </div>
                         </div>`
                         
                         template+=`
                         <!-- skills -->
 
                         <!-- Hobbies -->
                         `
                         hobbies.length > 0 ? 
                         template+=`
                         <div>
                             <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Hobbies</p>
                             <div class="text-center" style="color: black;">
                                 <!-- loop -->`: '<div><div>';
                                 hobbies.length > 0 ? 
                                     hobbies.map((hobby, index) => {
                                         template += `
                                         <p>${hobby.title}</p>
                                         `;
                                     }): '';
 
                                 hobbies.length > 0 ?
                                 template += `
                                 <!-- loop -->
                             </div>
                         </div>`: template+='</div></div>'
                         
                         template+=`
                         <!-- Hobbies -->
 
                         <!-- Languages -->
                         `
                         languages.length > 0 ?
                         template+=`
                         <div>
                             <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Languages</p>
                             <div class="text-center" style="color: black;">
                                 <!-- loop -->`: template+='<div><div>';
                                 languages.length > 0 ?
                                     languages.map((lang, index) => {
                                     template += `
                                         <p>${lang.name} (${lang.description})</p>
                                     `;
                                 }): '';
                                 languages.length > 0 ?
                                 template += `
                                 <!-- loop -->
                             </div>
                         </div>`: template+='</div></div>'
                         
                         template+=`
                         <!-- Languages -->
 
 
                         <!-- memberships -->`
                         memberships.length > 0 ? 
                         template+=`
                         <div>
                             <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">memberships</p>
                             <div class="text-center" style="color: black;">
                                 <!-- loop -->` : template+='<div><div>'
                                 memberships.length > 0 ? 
                                     memberships.map((membership, index) => {
                                                                 template += `
                                                     <p>${membership.organization}</p>
                                                     `;
                                     }): '';
 
                                 memberships.length > 0 ? 
                                 template += `
                                 <!-- loop -->
                             </div>
                         </div>`: template+='</div></div>'
                         
                         template+=`
                         <!-- memberships -->
 
                         <!-- awards -->`
                         awards.length > 0 ? 
                         template+=`
                         <div>
                             <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Awards</p>
                             <!-- loop -->`: template+='<div><div>'
                             awards.length > 0 ? 
                             awards.map((award, index) => {
                                 template += `
                             <div style="padding: 20px;">
                                 <p style="color: #2563eb; font-weight: bold;">${award.award}</p>
                                 <div style="color: black; padding-left: 18px;">
                                     <p>${award.description}</p>
                                 </div>
                             </div>
                             `;
                             }): '';
 
 
                             awards.length > 0 ? 
                             template += `
                             <!-- loop -->
                         </div>
                         <!-- awards -->
 
                     </div>`: template+='</div></div></div>'
                     
                     template+=`
                     <div class="col-md-9" style="border-top: 1px solid #f59e0b;">
                         <!-- work experience -->
                         <div style="margin-top: 20px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                                     Work
                                     Experience
                                 </p>
                             </div>
                             <!-- loop -->`
 
                 experiences.map((exp, index) => {
                     template += `
         <div style="padding-left: 40px; padding-right: 40px;">
             <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${exp.title},
                 ${exp.companyName}</p>
             <p style="color: #808080; font-size: 14px; line-height:16px">${exp.location} (${exp.startDate} -
                 ${exp.endDate})</p>
             <ul style="padding-left: 12px; font-size: 14px;">
                 <li>${exp.description}</li>
             </ul>
         </div>
         `;
                 });
 
 
 
                 template += `
                             <!-- loop -->
                         </div>
                         <!-- work experience -->
 
 
                         <!-- education -->
                         <div style="margin-top: 20px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                                     Education
                                 </p>
                             </div>
                             <!-- loop -->`
 
                 education.map((edu, index) => {
                     template += `
         <div style="padding-left: 40px; padding-right: 40px;">
             <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${edu.degree},
                 ${edu.fieldStudy}</p>
             <p style="color: #808080; font-size: 14px; line-height:16px">${edu.school} (${edu.startDate} -
                 ${edu.endDate})</p>
             <ul style="padding-left: 12px; font-size: 14px;">
                 <li>${edu.descriptionEdu}</li>
             </ul>
         </div>
         `;
                 });
 
 
                 template += `
                             <!-- loop -->
                         </div>
                         <!-- education -->
 
                         <!-- Projects -->`
                         projects.length > 0 ?
                         template+=`
                         <div style="margin-top: 50px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px; border-bottom: 1px solid rgb(229 231 235)">
                                     Projects
                                 </p>
                             </div>
                             <!-- loop -->`: template+='<div>';
 
 
 
                 projects.map((project, index) => {
                     template += `
         <div style="padding-left: 40px; padding-right: 40px; ">
             <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${project.title}</p>
             <p style="padding-left: 12px; font-size: 14px;">${project.description}</p>
         </div>
         `;
                 });
 
                 projects.length > 0 ?
                 template += `
                             <!-- loop -->
                         </div>
                         <!-- Projects -->`: template+='</div>'
                         internships.length > 0 ?
                         template+=`
                         <!-- Internship -->
                         <div style="margin-top: 50px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px; border-bottom: 1px solid rgb(229 231 235)">
                                     Internship Work
                                 </p>
                             </div>
                             <!-- loop -->`: template+='<div>'
 
                 internships.map((internship, index) => {
                     template += `
         <div style="padding-left: 40px; padding-right: 40px; ">
             <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">
                 ${internship.organization}, ${internship.role}</p>
             <p style="color: #808080; font-size: 14px; line-height:16px">${internship.duration} month(s)</p>
             <p style="padding-left: 12px; font-size: 14px;">${internship.description}</p>
         </div>`;
                 });
 
 
                 internships.length > 0 ?
                 template += `
                             <!-- loop -->
                         </div>
                         <!-- Internship -->`:template+="</div>"
                         
                         publications.length > 0 ?
                         template+=`
                         <!-- publication -->
                         <div style="margin-top: 50px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                                     Publications
                                 </p>
                             </div>
                             <!-- loop -->`: template+='<div>';
 
                 publications.map((publication, index) => {
                     template += `
         <div>
             <div style="padding-left: 40px; padding-right: 40px;">
                 <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${publication.title}</p>
                 <ul style="padding-left: 12px; font-size: 14px;">
                     <li>${publication.link}</li>
                 </ul>
             </div>
         </div>`
                 });
 
                 publications.length > 0 ?
                 template += `
                             <!-- loop -->
 
                         </div>
                         <!-- publication -->` : template+= '</div>'
                         
                         links.length > 0 ?
                         template+=`
                         <!-- links -->
                         <div style="margin-top: 50px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                                     Links
                                 </p>
                             </div>
                             <!-- loop -->`: template+= '<div>';
 
                 links.map((link, index) => {
                     template += `
         <div>
             <div style="padding-left: 40px; padding-right: 40px;">
                 <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${link.name}
                 </p>
                 <ul style="padding-left: 12px; font-size: 14px;">
                     <li>${link.link}</li>
                 </ul>
             </div>
         </div>
         `;
                 });
 
 
                 links.length > 0 ?
                 template += `
                             <!-- loop -->
 
 
                         </div>`: template+='</div>'
                         references.length > 0 ?
                         template+=`
                         <!-- links -->
                         <div style="margin-top: 50px;">
                             <div>
                                 <p class="text-center"
                                     style="font-weight: bold; font-size: 18px; line-height:28px; border-bottom: 1px solid rgb(229 231 235)">
                                     References
                                 </p>
                             </div>
                             <div style="display: flex; gap: 80px; padding-left: 40px; padding-right: 40px;">
                                 <!-- loop -->
                                 `: '<div>'
                                             references.map((refrence, index) => {
                                                 template += `
                                     <div>
                                         <p style="font-weight: bold; color: #2563eb; font-size: 16px; margin: 0px; padding: 0;">${refrence.referee_name}</p>
                                         <p style="margin: 0px; padding: 0; font-size: 14px;">${refrence.organization}</p>
                                         <p style="margin: 0px; padding: 0; font-size: 14px;">${refrence.role}</p>
                                         <p style="margin: 0px; padding: 0; font-size: 14px;">${refrence.email}</p>
                                         <p style="margin: 0px; padding: 0; font-size: 14px;">${refrence.phone}</p>
                                     </div>`
                                             });
 
                                     references.length > 0 ?
                                     template += `
                                 <!-- loop -->
                             </div>
                         </div>`: '</div>'
                         
                         template+=`
                     </div>
                 </div>
             </div>
 
             <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                 integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                 crossorigin="anonymous"></script>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
                 integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
                 crossorigin="anonymous"></script>
         </body>
 
         </html>
 `;

        const options = {
            method: 'POST',
            body: JSON.stringify({
                "template": template,
            }),
        };

        let aboutAI = await fetch('/api/puppeteer', options);
        let blob = await aboutAI.blob();
        FileSaver.saveAs(blob, "cv.pdf");
        setMDownload(false);
    }

    return (
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            download pdf
        </Button>
    );
}

export default PdfGenerationTemplateOne;


//             <div class="col-md-9">
//                 <p style="font-size: 20px; font-weight: bold;">Profile</p>
//                 <p style="font-size: 14px;">
//                 `;

//         template += `
//                 </p>
//             </div>
//         </div>
//         <!-- profile photo -->
//         <div class="row" style="color: black;">
//             <div class="col-md-3 p-0 " style="border-right: 1px solid #f59e0b; color: white;">
//                 <!-- skills -->
//                 <div>
//                     <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Skills</p>
//                     <div class="text-center" style="color: black;">
//                         <!-- loop -->`




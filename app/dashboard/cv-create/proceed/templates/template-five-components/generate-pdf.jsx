'use client'
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "../helpers/helpers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import FileSaver from "file-saver";


const GeneratePDF = ({userId}) => {
    const [mDownload, setMDownload] = useState(false);
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState(null);
    const [awards, setAwards] = useState(null);
    const [memberships, setMemberships] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [education, setEducation] = useState(null);
    const [experiences, setExperience] = useState(null);
    const [internships, setInternships] = useState(null);
    const [publications, setPublications] = useState(null);
    const [links, setLinks] = useState(null);
    const [references, setReferences] = useState(null);
    const [about, setAbout] = useState(null);
    const [projects, setProjects] = useState(null);

    async function getData() {
        let aboutData = await aboutGlobal(userId);
        setAbout(aboutData);

        let profData = await profileGlobal(userId);
        setProfile(profData);

        let skillData = await skillsGlobal(userId);
        setSkills(skillData);

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

        let referencesData = await referencesGlobal(userId);
        setReferences(referencesData);
    }

    useEffect(() => {
        getData();
    }, []);

  

    async function downloadPDF() {
        setMDownload(true);

        let subDoc = await getDoc(doc(db, 'subscriptions', userId));
        // take user to subscription page to begin payment
        if (subDoc.exists() == false) {
            return router.replace('/dashboard/subscription');
        } 

        const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
        </head>
        <body>
            <div class="container">
                <div class="row" style="background-color: white;">
                    <!-- grid one -->
                    <div style="background-color: #1E1B4B; color: white; font-size: 0.875rem; line-height: 1.25rem; padding: 1.25rem;" class="col-md-3  text-sm p-5">
                            <div style="width: 100%; display: flex; justify-content: center;">
                                <img src="${profile.file_url}" width=120 height=120 alt="profile-image" style="border-radius: 100%; width: 50%;" />
                            </div>
                        
                            <p style="margin-top: 0.5rem; font-size: 1rem; line-height: 1.5rem; font-weight: bold; text-align: center;">Programmer</p>
                            <!-- skills -->
                            
                            
        
                            <div style="margin-top: 2rem; padding-left: 1rem; padding-right: 1rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Skills</p>
                                <!-- loop -->
        `;
        
        // skills
        skills.map((skill, index) => {
            template += `
            <div  style="padding-left: 2rem; padding-right: 2rem;">
                <div style="margin-bottom: 1.25rem;">
                    <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem;" class=" lg:text-sm tracking-wide">${skills.skill}</p>
                    <div style="width: 100%; background-color: black; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; height: 0.625rem; margin-top: 0.25rem;">
                        <div style="background-color: #4F46E5; height: 0.625rem; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; width: ${skill.rate}%;"></div>
                    </div>
                </div>
            </div>
            `;
        });
        
        
        template +=  `
        <!-- loop -->
        </div>
        <!-- skills -->
        
        <!-- awards -->
        <div style="margin-top: 2.5rem; padding-left: 1rem; padding-right: 1rem;">
                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Awards</p>
        `;
        
        // awards
        awards.map((award, index) => {
            template +=   `    
                <!-- loop -->
                <div style="padding-left: 2rem; padding-right: 2rem; margin-bottom: 1.25rem;" key={index}> 
                    <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${award.award}</p>
                    <p style="font-size: 0.875rem; line-height: 1.25rem; color: #808080;" >${award.description}</p>
                </div>
                <!-- loop -->
            `;
        });
        
                            
                            
        template+=`
        </div>
                            <!-- awards -->
        
                            <!-- hobbies -->
                            <div style="margin-top: 2.5rem; padding-left: 1rem; padding-right: 1rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Hobbies</p>
                                <!-- loop -->`
        
        //hobbies
        hobbies.map((hobby, index) => {
            template+=`             
                <div style="padding-left: 2rem; padding-right: 2rem; margin-bottom: 1.25rem;" key={index}>
                    <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${hobby.title}</p>
                </div>
                <!-- loop -->
            `;
        })
        
        
                                
        template+=  `
                            </div>
                            <!-- hobbies -->
        
                            <!-- languages -->
                            <div style="margin-top: 2.5rem; padding-left: 1rem; padding-right: 1rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Languages</p>
                                <!-- loop -->`;
        languages.map((lang, index) => {
            template+= `
            <div style="padding-left: 2rem; padding-right: 2rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${lang.name}</p>
                <p style="color: #808080; font-size: 0.75rem; line-height: 1rem;">(${lang.description})</p>
            </div>
            <!-- loop -->
            `;
        })
        
        template+= 
                            `   
                            </div>
                            <!-- languages -->
        
                            <!-- memberships -->
                            <div style="margin-top: 2.5rem; padding-left: 1rem; padding-right: 1rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Memberships</p>
                                <!-- loop -->`;
        
        memberships.map((membership, index) => {
            template +=
            `                
            <div style="padding-left: 2rem; padding-right: 2rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${membership.organization}</p>
            </div>
            `;
        });
        
         template+=             `<!-- loop -->
                            </div>
                            <!-- memberships -->
        
                    </div>
                    <!-- grid one -->
        
        
                    <!-- grid two -->
                    <div style="padding-left: 2.5rem; padding-right: 2.5rem; padding-top: 1.25rem;" class="col-md-9">
                        <p style="font-weight: bolder; font-size: 1.25rem; line-height: 1.75rem; margin-bottom: 2rem; color: #1E1B4B;" >${profile.full_name}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; font-size: 0.75rem; line-height: 1rem; width: 100%;">
                            <div style="display: flex; gap: 0.5rem;">
                                <!-- <FontAwesomeIcon icon={faPhone} class="w-[8%] md:w-[8%] lg:w-[8%]" /> -->
                                <p>icon</p>
                                <p style="font-size: 12px;">${profile.phoneNumber}</p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <p>icon</p>
                                <p style="font-size: 12px;">${profile.email}</p>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <p>icon</p>
                                <p style="font-size: 12px;">${profile.location}</p>
                            </div>
                        </div>
        
                        <!-- about -->
                        <div style="margin-top: 2rem;">
                            <p style="font-size: 0.75rem; line-height: 1rem; color: #808080;">
                            ${about}
                            </p>
                        </div>
                        <!-- about -->
        
                        <!-- experience -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Work Experience</p>
                            <!-- loop -->`;
        experiences.map((exp,index) => {
            template+=  `                
            <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                <div style="margin-bottom: 1.5rem;">
                    <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${exp.title}, ${exp.companyName}</p>
                    <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
                    <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${exp.description}
                    </p>
                </div>
            </div>
            `;
        });
        
        template+=  `
                            <!-- loop -->
                        </div>
                        <!-- experience -->
        
        
                        <!-- education -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Education</p>
                            <!-- loop -->`;
        education.map((edu, index) => {
            template +=
            `
            
            <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                <div style="margin-bottom: 1.5rem;">
                    <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${edu.degree}, ${edu.fieldStudy}</p>
                    <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${edu.school} (${edu.startDate} - ${edu.endDate})</p>
                    <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${edu.descriptionEdu}
                    </p>
                </div>
            </div>
            `;
        });
        
        template+=   `
                            <!-- loop -->
                        </div>
                        <!-- education -->
        
                        <!-- internship -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Internship</p>
                            <!-- loop -->`;
            
        internships.map((internship, index) => {
        template+=  `
            <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
                <div style="margin-bottom: 1.5rem;">
                    <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${internship.organization}, ${internship.role}</p>
                    <p style="font-size: 0.75rem; line-height: 1rem; color: #808080; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
                    <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${internship.description}
                    </p>
                </div>
            </div>
            `;
        });
        
                                
        template+=  `
                            <!-- loop -->
                        </div>
                        <!-- internship -->
        
        
                        <!-- publication -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Publications</p>
                            <!-- loop -->`;
        
        publications.map((publication, index) => {
        template+= `
        <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
            <div style="margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${publication.title}</p>
                <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${publication.link}
                </p>
            </div>
        </div>
        `;
        });
        
        
        
        template+=  `
                            <!-- loop -->
                        </div>
                        <!-- publication -->
        
        
                        <!-- Links -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Links</p>
                            <!-- loop -->`;
            
        links.map((link, index) => {
        template+=   `
        <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
            <div style="margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${link.name}</p>
                <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${link.link}
                </p>
            </div>
        </div>
        `;
        });
        
        template+= `
                            <!-- loop -->
                        </div>
                        <!-- Links -->
        
        
                        <!-- Projects -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Projects</p>
                            <!-- loop -->`;
        projects.map((project, index) => {
        template+=  `
        <div style="padding-left: 1rem; padding-right: 1rem;" key={index}>
            <div style="margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem; font-weight: bold; margin-top: 1.25rem;">${project.title}</p>
                <p style="font-size: 0.75rem; line-height: 1rem;">
                    ${project.description}
                </p>
            </div>
        </div>
        `;
        });
        
        
        
        template+=  `
                            <!-- loop -->
                        </div>
                        <!-- Projects -->
        
        
                        <div class="mt-5 mb-10">
                            <p class="text-[10px] md:text-sm lg:text-base font-semibold text-[#1E1B4B] border-b border-[#808080] pb-2">References</p>
                                   
                                <div class="pr-2 pl-2 md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 flex flex-wrap gap-8">
                                `;
        
        references.map((refrence, index) => {
        template+=  `
            <div class="text-xs" key={index}>
                <p class="text-[8px] md:text-xs lg:text-sm font-semibold mb-2 md:mb-2 lg:mb-2">${refrence.referee_name}</p>
                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.organization}</p>
                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.role}</p>
                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.email}</p>
                <p class="text-[6px] md:text-[8px] lg:text-xs">${refrence.phone}</p>
            </div>`;
        });
        
        
        template += `
                                </div>
                                    
                            </div>
                    </div>
                    <!-- grid two -->
        
                </div>
            </div>
        
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
        </body>
        </html>
        `;

        try {
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
        } catch (error) {
            console.log(error);
        }
    }


    return (  
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            download pdf
        </Button>
    );
}
 
export default GeneratePDF;
'use client'
import { db } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";
import FileSaver from "file-saver";


const GeneratePDF = ({userId, aboutAI, skillsAi}) => {
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

        let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
        </head>
        <body>
            <div>
                <div class="row">
                    <div class="col-md-4" style="background-color: #44403c; color: white;">
                        <div class="text-center">
                            <img src="${profile.file_url}"  alt="" style="border-radius: 50%; width: 120px; height: 120px;">
                        </div>
                        <div  style="display: flex; flex-direction: column; margin-top: 18px;">
                            <div >
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td><i class="fa-solid fa-phone" style="color: #22c55e;"></i></td>
                                        <td><p style="font-size: 14px;">${profile.phoneNumber}</p></td>
                                    </tbody>
                                </table>
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td><i class="fa-solid fa-envelope" style="color: #22c55e;"></i></td>
                                        <td><p style="font-size: 14px;">${profile.email}</p></td>
                                    </tbody>
                                </table>
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td><i class="fa-solid fa-location-pin" style="color: #22c55e;"></i></td>
                                        <td><p style="font-size: 14px;">${profile.location}</p></td>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- skills -->
                        <div style="margin-bottom: 20px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Skills</p>
                            <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
                                <ul>`;
        
                            skills.filter((skill) => skill.checked === true)
                                .map((skill, index) => {
                                    template += `
                                        <li>${skill.skill}</li>
                                    `;
                                });

        template+=  `
                                </ul>
                            </div>
                        </div>
                        <!-- skills -->
                        <!-- skills -->
                        <div style="margin-top: 12px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Awards</p>`;



        awards.map((award,index) => { 
        template+=   `
        <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 24px;" key={index}>
            ${award.award}
        </p>
        `;
        });
            


        template+=  `
                        </div>
                        <!-- skills -->
                        <!-- membership -->

                        <div style="margin-bottom: 20px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Membership</p>
                            <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
                                <ul>`;

        memberships.map((membership,index) => { 
        template+=   `
            <li key={index}>${membership.organization}</li>
        `;
        });



                                    
        template+= `
                                </ul>
                            </div>
                        </div>
                        <!-- membership -->

                        <div style="margin-top: 12px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Languages</p>
                            
                                `;
        
        languages.map((language) => { 
        template+=   `
        <div key={index}>
            <p style="padding-left: 20px; padding-right: 20px; font-weight: bold; font-size: 16px;">${language.name}</p>
            <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 14px;">
                ${language.description}
            </p>
        </div>
        `;
        });

                                
        template += `
                        </div>
                    </div>
                    <!-- grid col 9 -->
                    <div class="col-md-8" style="padding:3%;">
                        <p style="font-weight: bold; font-size: 30px; line-height: 36px; color: #4d7c0f;">${profile.full_name}</p>
                        <!-- about -->
                        <div style="padding: 20px;">
                            <p  style="font-weight: bold; font-size: 1.125rem; border-bottom: 2px solid #22c55e;">About</p>
                            <p style="margin-top: 0.75rem; font-size: 1rem; line-height: 1.5rem;">`;
                            about
                            .filter((ab) => ab.checked === true)
                            .map((ab) => (
                                template += `
                                        ${ab.about}
                                    `
                            ));
                            template +=`
                            </p>
                        </div>
                        <!-- about -->

                        <!-- education -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Education</p>
                            `;

        education.map((edu) => {
        template+=  `
        <div style="display: flex; color: black;" key={index}>
            <div style="margin-bottom: 2rem;">
                <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${edu.degree}, ${edu.fieldStudy}</p>
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${edu.school} (${edu.startDate} - ${edu.endDate})</p>
                <div style="font-size: 0.875rem; line-height: 1.25rem;">
                    <p>${edu.descriptionEdu}</p>
                </div>
            </div>
        </div>
        `;
        });


        template+=  `
                            
                        </div>
                        <!-- education -->

                        <!-- experience -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Experience</p>
                            `;


        experiences.map((exp,index) => {
        template+= `
        <div style="display: flex; color: black;">
            <div style="margin-bottom: 2rem;">
                <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${exp.title}, ${exp.companyName}</p>
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
                <div style="font-size: 0.875rem; line-height: 1.25rem;">
                    <p>${exp.description}</p>
                </div>
            </div>
        </div>
        `;
        });



        template+=   `
                        </div>
                        <!-- experience -->

                        <!-- Internship -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Internship</p>
                            <div style="display: flex; color: black;">
                            `;


        internships.map((internship) => {               
        template+=  `
        <div style="margin-bottom: 2rem;">
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${internship.organization}, ${internship.role}</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${internship.description}</p>
            </div>
        </div>
        `;
        });

                                
        template +=`
                            </div>
                        </div>
                        <!-- Internship -->

                        <!-- Publications -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Publications</p>
                            <div style="display: flex; color: black;">
                            `;



        publications.map((publication, index) => {               
        template+= `
        <div style="margin-bottom: 2rem;">
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${publication.title}</p>
            
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${publication.link}</p>
            </div>
        </div>
        `;
        });


                                
        template+=`
                            </div>
                        </div>
                        <!-- Publications -->

                        <!-- Links -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Links</p>
                            <div style="display: flex; color: black;">
                            `;
        
                            
        links.map((link, index) => {
        template+= `
        <div style="margin-bottom: 2rem;" >
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${link.name}</p>
            
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${link.link}</p>
            </div>
        </div>
        `;
        });


                                
        template +=`
                            </div>
                        </div>
                        <!-- Links -->

                        <!-- references -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">References</p>
                            <div style="font-size: 1rem; line-height: 1.5rem; display: flex; gap: 5rem; padding: 2.5rem;">
                            `;
        references.map((refrence, index) => {             
        template+= `
        <div>
            <p style="font-weight: bold; color: #22c55e;">${refrence.referee_name}</p>
            <p>${refrence.organization}</p>
            <p>${refrence.role}</p>
            <p>${refrence.email}</p>
            <p>${refrence.phone}</p>
        </div>
        });
        `;
        });
                                
        template += `
                            </div>
                        </div>
                    </div>
                    <!-- references -->

                    <!-- grid col 9 -->
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
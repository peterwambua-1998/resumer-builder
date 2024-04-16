'use client'
import { db } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "../helpers/helpers";
import FileSaver from "file-saver";


const GeneratePDF = ({ userId }) => {
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

        let template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous" defer></script>
        </head>
        <body>
            <div>
                <div class="row">
                    <div class="col-md-4" style="background-color: #44403c; color: white; padding-left: 40px; padding-right: 40px;">
                        <div class="text-center">
                            <img src="${profile.file_url}"  alt="" style="border-radius: 50%; width: 120px; height: 120px;">
                        </div>
                        <div  style="display: flex; flex-direction: column; margin-top: 18px;">
                            <div>
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td>
                                            <svg
                                                class="w-[1.5vw] h-[1.5vh]" style="fill: #f59e0b;" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 522 522"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                                <path
                                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                            </svg>
                                        </td>
                                        <td><p style="font-size: 14px;">${profile.phoneNumber}</p></td>
                                    </tbody>
                                </table>
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td>
                                            <svg
                                                class="w-[1.5vw] h-[1.5vh]" style="fill: #f59e0b;" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 522 522"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                                <path
                                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                            </svg>
                                        </td>
                                        <td><p style="font-size: 14px;">${profile.email}</p></td>
                                    </tbody>
                                </table>
                                <table style="margin-bottom: 14px;">
                                    <tbody>
                                        <td>
                                            <svg
                                                class="w-[1.5vw] h-[1.5vh]" style="fill: #f59e0b;" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 522 522"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                                <path
                                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                            </svg>
                                        </td>
                                        <td><p style="font-size: 14px;">${profile.location}</p></td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `
                        skills.length > 0 ?
                        template+=`
                        <!-- skills -->
                        <div style="margin-bottom: 20px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Skills</p>
                            <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
                                <ul>`: '<div>'
                                    skills.map((skill, index) => {
                                        template += `
                                            <li  key={index}>${skill.name}</li>
                                    `;
                                    });
                                skills.length > 0 ?
                                template += `
                                </ul>
                            </div>
                        </div>`: '</div>'
                        awards.length > 0 ?
                        template+=`
                        <!-- skills -->
                        <!-- skills -->
                        <div style="margin-top: 12px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Awards</p>`: '<div>';

                            awards.map((award, index) => {
                                template += `
                                <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 24px;" key={index}>
                                    ${award.award}
                                </p>
                                `;
                            });
                            awards.length > 0 ?
                            template += `
                        </div>`: '</div>'
                        memberships.length > 0 ? 
                        template+=`
                        <!-- skills -->
                        <!-- membership -->
                        <div style="margin-bottom: 20px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Membership</p>
                            <div style="display: flex; justify-content: start; padding-left: 20px; padding-right: 20px;">
                                <ul>`: '<div>';

                                memberships.map((membership, index) => {
                                    template += `
                                    <li key={index}>${membership.organization}</li>
                                `;
                                });



                                memberships.length > 0 ?
                                template += `
                                </ul>
                            </div>
                        </div>
                        <!-- membership -->`: '</div>'
                        languages.length > 0 ?
                        template+=`
                        <div style="margin-top: 12px; padding: 8px;">
                            <p style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #22c55e;">Languages</p>
                            
                                `: '<div>';

                                languages.map((language) => {
                                    template += `
                                <div key={index}>
                                    <p style="padding-left: 20px; padding-right: 20px; font-weight: bold; font-size: 16px;">${language.name}</p>
                                    <p style="padding-left: 20px; padding-right: 20px; font-size: 14px; line-height: 14px;">
                                        ${language.description}
                                    </p>
                                </div>
                                `;
                                });

                        languages.length > 0 ?
                        template += `
                        </div>
                    </div>`: template+='</div>'
                    
                    template+=`
                    <!-- grid col 9 -->
                    <div class="col-md-8" style="padding:3%;">
                        <p style="font-weight: bold; font-size: 30px; line-height: 36px; color: #4d7c0f;">${profile.full_name}</p>
                        <!-- about -->
                        <div style="padding: 20px;">
                            <p  style="font-weight: bold; font-size: 1.125rem; border-bottom: 2px solid #22c55e;">About</p>
                            <p style="margin-top: 0.75rem; font-size: 1rem; line-height: 1.5rem;">`;
                            if (about) {
                                template+=`
                                    ${about}
                                `
                            } else {
                                template+=`
                                    ipsum dolor sit amet consectetur adipisicing elit. Repellendus quis nihil ipsum laborum blanditiis, tenetur delectus aut aspernatur asperiores eaque ipsam, tempore saepe maxime! Sapiente dolor autem sunt laboriosam totam.
                                `;
                            }
                            template+=`
                            </p>
                        </div>
                        <!-- about -->

                        <!-- education -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Education</p>
                            `;

                        education.map((edu) => {
                            template += `
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


        template += `
                            
                        </div>
                        <!-- education -->

                        <!-- experience -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Experience</p>
                            `;


        experiences.map((exp, index) => {
            template += `
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


        internships.length > 0 ? 
        template += `
                        </div>
                        <!-- experience -->

                        <!-- Internship -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Internship</p>
                            <div style="color: black;">
                            `: '';


        internships.map((internship) => {
            template += `
        <div style="margin-bottom: 2rem;">
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${internship.organization}, ${internship.role}</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${internship.description}</p>
            </div>
        </div>
        `;
        });

        internships.length > 0 ? 
        template += `
                            </div>
                        </div>
                        <!-- Internship -->`: ''
                        publications.length > 0 ?
                        template+=`
                        <!-- Publications -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Publications</p>
                            <div style=" color: black;">
                            `: '';



        publications.map((publication, index) => {
            template += `
        <div style="margin-bottom: 2rem;">
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${publication.title}</p>
            
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${publication.link}</p>
            </div>
        </div>
        `;
        });


        publications.length > 0 ?
        template += `
                            </div>
                        </div>
                        <!-- Publications -->`: ''
                        links.length > 0 ?
                        template+=`

                        <!-- Links -->
                        <div style="padding: 1.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">Links</p>
                            <div style="color: black;">
                            `: '';


        links.map((link, index) => {
            template += `
        <div style="margin-bottom: 2rem;" >
            <p style="color: #22c55e; font-weight: bold; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.5rem;">${link.name}</p>
            
            <div style="font-size: 0.875rem; line-height: 1.25rem;">
                <p>${link.link}</p>
            </div>
        </div>
        `;
        });


        links.length > 0 ?
        template += `
                            </div>
                        </div>
                        <!-- Links -->`: ''
                        references.length > 0 ?
                        template+=`
                        <!-- references -->
                        <div style="padding: 0.25rem;">
                            <p style="font-weight: bold; margin-bottom: 0.75rem; font-size: 1.25rem; line-height: 1.75rem;">References</p>
                            <div style="font-size: 1rem; line-height: 1.5rem; display: flex; gap: 5rem; padding: 0.2rem;">
                            `: '<div>';
                            references.map((refrence, index) => {
                                template += `
                            <div>
                                <p style="font-weight: bold; color: #22c55e; margin: 0px;">${refrence.referee_name}</p>
                                <p style="margin: 0px; font-size: 0.75rem; line-height: 1rem;">${refrence.organization}</p>
                                <p style="margin: 0px; font-size: 0.75rem; line-height: 1rem;">${refrence.role}</p>
                                <p style="margin: 0px; font-size: 0.75rem; line-height: 1rem;">${refrence.email}</p>
                                <p style="margin: 0px; font-size: 0.75rem; line-height: 1rem;">${refrence.phone}</p>
                            </div>
                            `;
                            });

                            references.length > 0 ?
                            template += `
                            </div>
                        </div>`: '</div>'
                        
                        template+=`
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
'use client'
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "../helpers/helpers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
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
    const [hobbies, setHobbies] = useState(null);

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

        let hobbiesData = await hobbiesGlobal(userId);
        setHobbies(hobbiesData);

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
            <div class="">
                <div class="row" style="background-color: white;">
                    <!-- grid one -->
                    <div style="background-color: #1E1B4B; color: white; font-size: 0.875rem; line-height: 1.25rem; padding: 0.001rem;" class="col-md-4  text-sm p-5">
                            <div style="width: 100%; display: flex; justify-content: center;">
                                <img src="${profile.file_url}" width=120 height=120 alt="profile-image" style="border-radius: 100%; width: 50%;" />
                            </div>
                        
                            <p style="margin-top: 0.5rem; font-size: 1rem; line-height: 1.5rem; font-weight: bold; text-align: center;">Programmer</p>
                            <!-- skills -->`
                            
                            skills.length > 0 ?
                            template+=`
                            <div style="margin-top: 2rem; padding-left: 0.002rem; padding-right: 0.002rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Skills</p>
                                <!-- loop -->
                                `: '';
                                // skills
                                skills.map((skill) => {
                                    let skillPercentage = Number(skill.skillLevel) / 10 * 100;
                                    template += `
                                    <div  style="padding-left: 0.1rem; padding-right: 0.1rem;">
                                        <div style="margin-bottom: 1.25rem;">
                                            <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem;" class=" lg:text-sm tracking-wide">${skill.name}</p>
                                            <div style="width: 100%; background-color: black; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; height: 0.625rem; margin-top: 0.25rem;">
                                                <div style="background-color: #4F46E5; height: 0.625rem; border-top-left-radius: 36px; border-top-right-radius: 36px; border-bottom-right-radius: 36px; border-bottom-left-radius: 36px; width: ${skillPercentage}%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                });


                            template += `
                            <!-- loop -->
                            </div>
                            <!-- skills -->`
                            awards.length > 0 ?
                            template+=`
                            <!-- awards -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                    <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Awards</p>
                            `: '';

                            // awards
                            awards.map((award, index) => {
                                template += `    
                                    <!-- loop -->
                                    <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem;" key={index}> 
                                        <p style="font-weight: bold; font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${award.award}</p>
                                        <p style="font-size: 0.875rem; line-height: 1.25rem; color: #808080;" >${award.description}</p>
                                    </div>
                                    <!-- loop -->
                                `;
                            });


                            awards.length > 0 ?
                            template += `
                            </div>
                            <!-- awards -->`: ''
                            hobbies.length > 0 ?
                            template+=`
                            <!-- hobbies -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Hobbies</p>
                                <!-- loop -->`: ''

                                    //hobbies
                                    hobbies.map((hobby, index) => {
                                        template += `             
                                            <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem;" key={index}>
                                                <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${hobby.title}</p>
                                            </div>
                                            <!-- loop -->
                                        `;
                                    })


                            hobbies.length > 0 ?
                            template += `
                            </div>
                            <!-- hobbies -->`: ''
                            languages.length > 0 ?
                            template+=`
                            <!-- languages -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Languages</p>
                                <!-- loop -->`: '';
                                    languages.map((lang, index) => {
                                        template += `
                                        <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                                            <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${lang.name}</p>
                                            <p style="color: #808080; font-size: 0.75rem; line-height: 1rem;">(${lang.description})</p>
                                        </div>
                                        <!-- loop -->
                                        `;
                                    })
                            languages.length > 0 ?
                            template +=
                            ` 
                            </div>
                            <!-- languages -->`: ''
                            memberships.length > 0 ?
                            template+=`
                            <!-- memberships -->
                            <div style="margin-top: 2.5rem; padding-left: 0.05rem; padding-right: 0.05rem;">
                                <p style="text-align: center; font-weight: bold; border-bottom: 2px solid #808080; font-size: 1rem; line-height: 1.5rem; padding-bottom: 0.5rem; margin-bottom: 1.25rem;">Memberships</p>
                                <!-- loop -->`: '';
                                memberships.map((membership, index) => {
                                    template +=
                                        `                
                                    <div style="padding-left: 0.1rem; padding-right: 0.1rem; margin-bottom: 1.25rem; display: flex; gap: 0.5rem;" key={index}>
                                        <p style="font-weight: bold; font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem;">${membership.organization}</p>
                                    </div>
                                    `;
                                });

                            memberships.length > 0 ?
                            template += `<!-- loop -->
                            </div>
                            <!-- memberships -->`: ''
                            
                            template+=`
                    </div>
                    <!-- grid one -->
        
        
                    <!-- grid two -->
                    <div style="padding-left: 2.5rem; padding-right: 2.5rem; padding-top: 1.25rem;" class="col-md-8">
                        <p style="font-weight: bolder; font-size: 1.25rem; line-height: 1.75rem; margin-bottom: 2rem; color: #1E1B4B;" >${profile.full_name}</p>
                        <div style="margin: 0px; padding: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; font-size: 0.75rem; line-height: 1rem; width: 100%;">
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                <p style="font-size: 12px;">${profile.phoneNumber}</p>
                            </div>
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                </svg>
                                <p style="font-size: 12px;">${profile.email}</p>
                            </div>
                            <div style="display: flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28%; height: 28%; padding-top: 0.3%"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                                <p style="font-size: 12px;">${profile.location}</p>
                            </div>
                        </div>
        
                        <!-- about -->
                        <div style="margin-top: 1rem;">
                            <p style="font-size: 0.75rem; line-height: 1rem; color: #808080;">`
                            if (about) {
                                template+=`
                                ${about}
                                ` 
                            } else {
                                template+=`
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore dignissimos reprehenderit laboriosam! Voluptas exercitationem eligendi deserunt, consequatur facere ab voluptates enim, culpa aperiam velit similique assumenda, repellat vero aliquid ex.
                                `
                            }
                            template+=`
                            </p>
                        </div>
                        <!-- about -->
        
                        <!-- experience -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Work Experience</p>
                            <!-- loop -->`;
                            experiences.map((exp, index) => {
                                template += `                
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

                            template += `
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

                            template += `
                            <!-- loop -->
                        </div>
                        <!-- education -->`
                        
                        internships.length > 0 ?
                        template+=`
                        <!-- internship -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Internship</p>
                            <!-- loop -->`: '';

                            internships.map((internship, index) => {
                                template += `
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

                            internships.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- internship -->`: ''
                        publications.length > 0 ?
                        template+=`
                        <!-- publication -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Publications</p>
                            <!-- loop -->`: '';

                            publications.map((publication, index) => {
                                template += `
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


                            publications.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- publication -->`: ''
                        links.length > 0 ?
                        template+=`
                        <!-- Links -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Links</p>
                            <!-- loop -->`: '';

                                links.map((link, index) => {
                                    template += `
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
                            links.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- Links -->`: ''
                        projects.length > 0 ?
                        template+=`
                        <!-- Projects -->
                        <div style="margin-top: 2rem;" >
                            <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">Projects</p>
                            <!-- loop -->`: '';
                            projects.map((project, index) => {
                                template += `
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


                            projects.length > 0 ?
                            template += `
                            <!-- loop -->
                        </div>
                        <!-- Projects -->
                            `: ''
                        references.length > 0 ?
                        template+=`
                        <div style="margin-top: 2rem; margin-bottom: 2.5rem;">
                        <p style="font-size: 1rem; line-height: 1.5rem; font-weight: bold; color: #1E1B4B; border-bottom: 1px solid #808080; padding-bottom: 0.5rem;">References</p>
                                   
                                <div class="pr-2 pl-2 md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 flex flex-wrap gap-8">
                                `: '';

                                    references.map((refrence, index) => {
                                        template += `
                                        <div class="text-xs" key={index}>
                                            <p style="font-size: 0.875rem; line-height: 1.25rem; font-wight: bold; margin-bottom: 0.5rem">${refrence.referee_name}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem" >${refrence.organization}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem">${refrence.role}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem; margin-bottom: 0.5rem">${refrence.email}</p>
                                            <p style="font-size: 0.75rem; line-height: 1rem;">${refrence.phone}</p>
                                        </div>`;
                                    });

                                references.length > 0 ?
                                template += `
                                </div> 
                            </div>`: ''
                            template+=`
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
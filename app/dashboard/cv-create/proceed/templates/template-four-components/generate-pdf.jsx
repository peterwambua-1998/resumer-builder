'use client'
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "../helpers/helpers";


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

        let referencesData = await referencesGlobal(userId);
        setReferences(referencesData);
    }

    useEffect(() => {
        getData();
    }, []);

  

    function downloadPDF() {
        setMDownload(true);
        const template = `
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
            <div class="container">
                <div style="background-color: white; padding: 2.5rem; border: 4px solid #d97706;">
                    <!-- cv head -->
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <img src="${profile.file_url}" width="80" height="80" alt="profile" style="border-radius: 50%;">
                        <div>
                            <div>
                                <h3 style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.25rem; line-height: 1.75rem;" >${profile.full_name}</h3>
                                <p style="color: #808080; font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${profile.professionalTitle}</p>
                            </div>
                        </div>
                    </div>
                    <!-- cv head -->
        
                    <!-- about -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">About</p>
                        <p style="font-size: 0.875rem; line-height: 1.25rem;">${about}</p>
                    </div>
                    <!-- about -->
        
                     <!-- Experience -->
                     <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Experience</p>
                        <!-- loop about -->`;
        
        experiences.map((exp, index) => {
        
        template+=  `
            <div>
                <p style="color: #d97706; font-weight: bold; font-size: 1.125rem; line-height: 1.75rem;">${exp.title}, ${exp.companyName}</p>
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
                <div style="padding-left: 0.75rem;">
                    <ul>
                        <li>${exp.description}</li>
                    </ul>
                </div>
            </div>`;
        });
                        
        template+=  `
                        <!-- loop about -->
                    </div>
                    <!-- Experience -->
        
                    <!-- Education -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Education</p>
                        <!-- loop about -->`;
        education.map((edu, index) => {
        template+=  `
        <div>
            <p style="color: #d97706; font-weight: bold; font-size: 1.125rem; line-height: 1.75rem;">${edu.degree}, ${edu.fieldStudy}</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${edu.school} (${edu.startDate} - ${edu.endDate})</p>
            <div style="padding-left: 0.75rem;">
                <ul>
                    <li>${edu.descriptionEdu}</li>
                </ul>
            </div>
        </div>`;
        });
                        
        template+=  `
                        <!-- loop about -->
                    </div>
                    <!-- Education -->
        
                    <!-- Publications -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Publications</p>
                        <!-- loop about -->`;
        
        publications.map((publication, index) => {        
        template+=`
        <div>
            <p style="color: #d97706; font-weight: bold; font-size: 1.125rem; line-height: 1.75rem;">${publication.title}</p>
            <div style="padding-left: 0.75rem;">
                <ul>
                    <li>${publication.link}</li>
                </ul>
            </div>
        </div> `;
        });
                   
                        
        template+=`
                        <!-- loop about -->
                    </div>
                    <!-- Publications -->
        
                     <!-- Internship -->
                     <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Internship</p>
                        <!-- loop about -->`
        
        internships.map((internship, index) => {  
        template+=`
            <div>
                <p style="color: #d97706; font-weight: bold; font-size: 1.125rem; line-height: 1.75rem;">${internship.organization}, ${internship.role}</p>
                <p style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 0.5rem;">${internship.duration} month(s)</p>
                <div style="padding-left: 0.75rem;">
                    <ul>
                        <li>${internship.description}</li>
                    </ul>
                </div>
            </div>`;
        });
        
                        
        template+=`
                        <!-- loop about -->
                    </div>
                    <!-- Internship -->
        
                    <!-- skills -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Skills</p>
                        <!-- loop -->
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">`;
        skills.map((skill,index) => {           
        template+=`
            <span key={index} style="padding: 1rem; background-color: #d97706; color: black; border-radius: 30.4px;" class="badge">${skill.skill}</span>
        `;
        });
                        
                        `
                        </div>
                        <!-- loop -->
                    </div>
                    <!-- skills -->
        
                    <!-- Memberships -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Memberships</p>
                        <!-- loop -->
                        <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">`;
        
        memberships.map((membership,index) => { 
        template+=`
            <span style="padding: 1rem; background-color: #d97706; color: black; border-radius: 30.4px;" class="badge">${membership.organization}</span>
        `;
        });
           
                            
        
        template+=`
                        </div>
                        <!-- loop -->
                    </div>
                    <!-- Memberships -->
        
                    <!-- links -->
                    <div style="border-bottom: 1px solid #808080; margin-bottom: 1rem;">
                        <p style="margin-bottom: 0.5rem; font-weight: bold;">Links</p>`
                        
        links.map((link, index) => {             
        template+=`
        <div style="font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 1rem;" >
            <p><span style="font-weight: bold; padding-right: 0.5rem;">${link.name}: </span><span style="color: #d97706;">${link.link}</span></p>
        </div>`;
        });
                        
        
        
        template+=`
                    </div>
                    <!-- links -->
        
                    <div>
                        <p style="margin-bottom: 0.5rem; font-weight: bold; margin-top: 2rem;" >References</p>
                        <div className="md:flex md:gap-20">
                            <!-- loop -->`;
                            
                            
        
        
        references.map((refrence, index) => {
            template+=`
            <div>
                <div style="font-size: 0.875rem; line-height: 1.25rem;">
                    <p style="font-weight: bold; color: #f59e0b;">${refrence.referee_name}</p>
                    <p>${refrence.organization}</p>
                    <p>${refrence.role}</p>
                    <p>${refrence.email}</p>
                    <p>${refrence.phone}</p>
                </div>
            </div>`;
        });
        
                            
        template+=`
                            <!-- loop -->
                        </div>
                        
                    </div>
        
                </div>
            </div>
            
        
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
    }


    return (  
        <Button onClick={() => downloadPDF()} color="primary">
            {mDownload == true ? <Loading /> : ''}
            download pdf
        </Button>
    );
}
 
export default GeneratePDF;
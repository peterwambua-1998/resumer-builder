'use client'
import { useState, useEffect } from "react";
import { Button, Loading } from "react-daisyui";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "../helpers/helpers";
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
    const [hobbies, setHobbies] = useState(null);

    async function getData() {
        let aboutData = await aboutGlobal(userId);
        setAbout(aboutData);

        let profData = await profileGlobal(userId);
        setProfile(profData);

        let skillData = await skillsGlobal(userId);
        setSkills(skillData);

        let hobbiesData = await hobbiesGlobal(userId);
        setHobbies(hobbiesData);

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
        let template = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://kit.fontawesome.com/6557f5a19c.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="pl-[10vw] pr-[10vw] pt-5 pb-5 bg-slate-200">
        <div class="bg-white p-5">
            <!-- name and role -->
            <div class="flex gap-4">
                <div class="w-[2%] bg-violet-900"></div>
                <div>
                    <p class="text-3xl font-bold">${profile.full_name}</p>
                </div>
            </div>
            <div class="mt-4 pb-2 border-b border-slate-400">
                <p class="text-violet-900">${profile.professionalTitle}</p>
            </div>
            <!-- name and role -->

            <!-- contact -->
            <div class="mt-4">
                <p class="text-sm text-[#808080] font-bold">CONTACT</p>
                <div class="grid grid-cols-3 text-sm mt-2">
                    <div class="flex">
                        <p style="padding-left: 0px; padding-right: 0px;" class="h-fit w-fit pt-1"><svg
                                class="w-[2.5vw] h-[2.5vh]" style="fill: #4c1d95;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                            </svg></p>
                        <p>${profile.email}</p>
                    </div>
                    <div class="flex">
                        <p style="padding-left: 0px; padding-right: 0px;" class="h-fit pt-1">
                            <svg class="w-[2.5vw] h-[2.5vh]" style="fill:#4c1d95" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
                            </svg>
                        </p>
                        <p>${profile.location}</p>
                    </div>
                    <div class="flex">
                        <p style="padding-left: 0px; padding-right: 0px;" class="h-fit pt-1">
                            <svg class="w-[2.5vw] h-[2.5vh]" style="fill: #4c1d95;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                <path
                                    d="M0 64C0 28.7 28.7 0 64 0H256c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm64 96v64c0 17.7 14.3 32 32 32H224c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 352a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM128 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H128z" />
                            </svg>
                        </p>
                        <p>${profile.phoneNumber}</p>
                    </div>
                </div>
            </div>
            <!-- contact -->

            <div class="mt-4">
                <p class="text-sm text-[#808080] font-bold">ABOUT</p>
                <p class="text-sm">${about}</p>
            </div>

            <!-- grid -->
            <div class="grid grid-cols-6 mt-6 gap-10">
                <div class="col-span-4">
                    <!-- profile -->`
                    experiences.length > 0 ?
                    `
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Experience</p>`:''
                        experiences.map((exp) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-lg font-semibold">${exp.title} <span class="text-[#808080]">@ ${exp.companyName}</span></p>
                                <p class="text-sm font-semibold text-[#475569]">${exp.location} (${exp.startDate} - ${exp.endDate})</p>
                                <p class="text-sm"> ${exp.description}</p>
                            </div>`;
                        })
                        
                        experiences.length > 0 ?
                        template+=`
                    </div>
                    <!-- profile -->`: ''
                    
                    education.length > 0 ? 
                    template+=`
                    <!-- profile -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Education</p>
                        `: ''
                        
                        education.map((edu) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-lg font-semibold">${edu.school}</span></p>
                                <p class="text-sm font-semibold text-[#475569]">${edu.startDate} - ${edu.endDate}</p>
                                <p class="text-sm"> ${edu.descriptionEdu}</p>
                            </div>`
                        })
                        
                        education.length > 0 ? 
                        template+=`
                    </div>
                    <!-- profile -->`: ''
                    projects.length > 0 ? 
                    template+=`
                    <!-- Projects -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Projects</p>`: ''
                        projects.map((project) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-lg font-semibold">${project.title}</p>
                                <p class="text-sm"> ${project.description}</p>
                            </div>`;
                        })
                        
                        projects.length > 0 ? 
                        template+=`
                    </div>
                    <!-- Projects -->`: ''
                    internships.length > 0 ?
                    template+=`
                    <!-- Projects -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Internship Work</p>`: ''
                        
                        internships.map((internship) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-lg font-semibold">${internship.role} <span class="text-[#808080]">@ ${internship.organization}</span></p>
                                <p class="text-sm font-semibold text-[#475569]">${internship.duration} month(s)</p>
                                <p class="text-sm"> ${internship.description}</p>
                            </div>`;
                        })
                        
                        internships.length > 0 ?
                        template+=`
                    </div>
                    <!-- Projects -->`: ''
                    
                    publications.length > 0 ? 
                    template+=`
                    <!-- Links -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Publications</p>`:''
                        
                        publications.map((publication) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-base font-semibold">${publication.title}</p>
                                <p class="text-sm text-[#475569]"> ${publication.link}</p>
                            </div>`
                        })

                        publications.length > 0 ?
                        template+=`
                    </div>
                    <!-- Links -->`: ''
                    links.length > 0 ?
                    template+=`
                    <!-- Links -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Links</p>`: ''
                        
                        links.map((link) => {
                            template+=`
                            <div class="mt-2 mb-2">
                                <p class="text-base font-semibold">${link.name}</p>
                                <p class="text-sm text-[#475569]"> ${link.link}</p>
                            </div>`
                        })
                        
                    links.length > 0 ?
                        template+=`
                    </div>
                    <!-- Links -->`: ''
                    references.length > 0 ?
                    template+=`
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">References</p>
                        <div class="flex gap-10 flex-wrap">` : ''
                        
                        references.map((refrence) => {
                            template+=`
                            <div class="text-xs">
                                <p class="text-[8px] md:text-xs lg:text-sm font-semibold mb-2 md:mb-2 lg:mb-2">${refrence.referee_name}</p>
                                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.organization}</p>
                                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.role}</p>
                                <p class="text-[6px] md:text-[8px] lg:text-xs mb-2 md:mb-2 lg:mb-2">${refrence.email}</p>
                                <p class="text-[6px] md:text-[8px] lg:text-xs">${refrence.phone}</p>
                            </div>`
                        })
                            
                    references.length > 0 ?
                            template+=`
                        </div>
                    </div>`: ''
                    
                    template+=`
                </div>
                <div class="col-span-2">
                    <!-- skills -->
                    `
                    skills.length > 0 ? 
                    template+=`
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Skills</p>
                        <div class="flex gap-2 flex-wrap text-sm">` : ''
                        
                        skills.map((skill) => {
                            template+=`
                                <span class="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">${skill.name}</span>
                            `
                        })
                        skills.length > 0 ? 
                        template+=`</div>
                    </div>
                    <!-- skills -->

                    `: ''
                    languages.length > 0 ?
                    template+=`
                    <!-- languages -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Languages</p>
                        <div class="flex gap-2 flex-wrap text-sm">
                        
                    `: ''
                        languages.map((lang) => {
                            template+=`
                                <span class="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">${lang.name} (${lang.description})</span>
                            `
                        })
                        languages.length > 0 ?
                        template+=`   
                        </div>
                    </div>
                    <!-- languages -->

                    <!-- Memberships -->
                    `: ''
                    memberships.length > 0 ?
                    template+=`
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Memberships</p>
                        <div class="flex gap-2 flex-wrap text-sm">`: ''
                        
                        memberships.map((membership) => {
                            template+=`
                                <span class="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">${membership.organization}</span>
                            `
                        })
                        memberships.length > 0 ?
                            template+=`  
                        </div>
                    </div>
                    <!-- Memberships -->
                    `: ''
                    hobbies.length > 0 ?
                    template+=`  
                    <!-- Hobbies -->
                    <div class="mb-10">
                        <p class="text-violet-900 font-bold">Hobbies</p>
                        <div class="flex gap-2 flex-wrap text-sm">
                    `: '';
                        
                        hobbies.map((hobby) => {
                            template+=`
                            <span class="bg-slate-200 pl-2 pt-1 pb-1 pr-2 rounded text-[#475569] font-semibold">${hobby.title}</span>
                            `
                        })
                        hobbies.length > 0 ?
                        template+=`
                        </div>
                    </div>`: ''
                    
                    template+=`
                    <!-- Hobbies -->
                </div>
            </div>
        </div>
    </div>
</body>

</html>`;

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
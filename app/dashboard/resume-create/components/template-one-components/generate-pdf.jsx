'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";
import { aboutGlobal, awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, languagesGlobal, linksGlobal, membershipsGlobal, profileGlobal, projectsGlobal, publicationsGlobal, referencesGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";

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
            <div style="width: 100%; display: flex; gap: 0.5rem; justify-content: space-around;">
                <div style="display:flex; gap: 2px;">
                    <p style="font-size: 12px;"><i class="fa-solid fa-location-pin" style="color: #f59e0b; font-size: 12px;"></i></p>
                    <p style="font-size: 12px;">${profile.location}</p>
                </div>
                <div  style="display:flex; gap: 2px;">
                    <p style="font-size: 12px;"><i class="fa-solid fa-envelope" style="color: #f59e0b; font-size: 12px;"></i></p>
                    <p style="font-size: 12px;">${profile.email}</p>
                </div>
                <div style="display:flex; gap: 2px;">
                    <p style="font-size: 12px;"><i class="fa-solid fa-phone" style="color: #f59e0b; font-size: 12px;"></i></p>
                    <p style="font-size: 12px;">${profile.phoneNumber}</p>
                </div>
            </div>
            <!-- icons and text -->

        </div>
        <!-- top blue area -->
        <div class="row" style="color: black;">
            <div class="col-md-3 text-center">
                <img src="${profile.file_url}" alt="" srcset="" style="width: 120px; height: 120px;">
            </div>
            <div class="col-md-9">
                <p style="font-size: 20px; font-weight: bold;">Profile</p>
                <p style="font-size: 14px;">
                `;
        about
            .filter((ab) => ab.checked === true)
            .map((ab) => (
                template += `
                        ${ab.about}
                    `
            ));
        template += `
                </p>
            </div>
        </div>
        <!-- profile photo -->
        <div class="row" style="color: black;">
            <div class="col-md-3 p-0 " style="border-right: 1px solid #f59e0b; color: white;">
                <!-- skills -->
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
                </div>
                <!-- skills -->

                <!-- Hobbies -->
                <div>
                    <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Hobbies</p>
                    <div class="text-center" style="color: black;">
                        <!-- loop -->`;

        hobbies.map((hobby, index) => {
            template += `
<p>${hobby.title}</p>
`;
        });


        template += `
                        <!-- loop -->
                    </div>
                </div>
                <!-- Hobbies -->

                <!-- Languages -->
                <div>
                    <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Languages</p>
                    <div class="text-center" style="color: black;">
                        <!-- loop -->`;


        languages.map((lang, index) => {
            template += `
<p>${lang.name} (${lang.description})</p>
`;
        });



        template += `
                        <!-- loop -->
                    </div>
                </div>
                <!-- Languages -->


                <!-- memberships -->
                <div>
                    <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">memberships</p>
                    <div class="text-center" style="color: black;">
                        <!-- loop -->`
        memberships.map((membership, index) => {
            template += `
<p>${membership.organization}</p>
`;
        });


        template += `
                        <!-- loop -->
                    </div>
                </div>
                <!-- memberships -->

                <!-- awards -->
                <div>
                    <p class="p-1 text-center" style="font-weight: bold; background-color: #1e1b4b;">Awards</p>
                    <!-- loop -->`

        awards.map((award, index) => {
            template += `
<div style="padding: 20px;">
    <p style="color: #2563eb; font-weight: bold;">${award.award}</p>
    <div style="color: black; padding-left: 18px;">
        <p>${award.description}</p>
    </div>
</div>
`;
        });



        template += `
                    <!-- loop -->
                </div>
                <!-- awards -->

            </div>

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

                <!-- Projects -->
                <div style="margin-top: 50px;">
                    <div>
                        <p class="text-center"
                            style="font-weight: bold; font-size: 18px; line-height:28px; border-bottom: 1px solid rgb(229 231 235)">
                            Projects
                        </p>
                    </div>
                    <!-- loop -->`



        projects.map((project, index) => {
            template += `
<div style="padding-left: 40px; padding-right: 40px; ">
    <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">${project.title}</p>
    <p style="padding-left: 12px; font-size: 14px;">${project.description}</p>
</div>
`;
        });


        template += `
                    <!-- loop -->
                </div>
                <!-- Projects -->

                <!-- Internship -->
                <div style="margin-top: 50px;">
                    <div>
                        <p class="text-center"
                            style="font-weight: bold; font-size: 18px; line-height:28px; border-bottom: 1px solid rgb(229 231 235)">
                            Internship Work
                        </p>
                    </div>
                    <!-- loop -->`

        internships.map((internship, index) => {
            template += `
<div style="padding-left: 40px; padding-right: 40px; ">
    <p style="color: #2563eb; font-weight: bold; font-size: 18px; line-height:28px">
        ${internship.organization}, ${internship.role}</p>
    <p style="color: #808080; font-size: 14px; line-height:16px">${internship.duration} month(s)</p>
    <p style="padding-left: 12px; font-size: 14px;">${internship.description}</p>
</div>`;
        });



        template += `
                    <!-- loop -->
                </div>
                <!-- Internship -->

                <!-- publication -->
                <div style="margin-top: 50px;">
                    <div>
                        <p class="text-center"
                            style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                            Publications
                        </p>
                    </div>
                    <!-- loop -->`

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


        template += `
                    <!-- loop -->

                </div>
                <!-- publication -->

                <!-- links -->
                <div style="margin-top: 50px;">
                    <div>
                        <p class="text-center"
                            style="font-weight: bold; font-size: 18px; line-height:28px;  border-bottom: 1px solid rgb(229 231 235)">
                            Links
                        </p>
                    </div>
                    <!-- loop -->`

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


        template += `
                    <!-- loop -->


                </div>
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
                        `
        references.map((refrence, index) => {
            template += `
<div>
    <p style="font-weight: bold; color: #2563eb; font-size: 16px;">${refrence.referee_name}</p>
    <p>${refrence.organization}</p>
    <p>${refrence.role}</p>
    <p>${refrence.email}</p>
    <p>${refrence.phone}</p>
</div>`
        });


        template += `
                        <!-- loop -->
                    </div>
                </div>
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
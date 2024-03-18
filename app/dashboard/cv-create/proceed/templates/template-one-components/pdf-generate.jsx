'use client'
import { db, app } from "@/app/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Modal, Input, Skeleton, Loading } from "react-daisyui";
import FileSaver from "file-saver";

const PdfGenerationTemplateOne = ({userId}) => {

    const [profile, setProfile] = useState(null);
    const [mDownload, setMDownload] = useState(false);
    const [about, setAbout] = useState(null);

    async function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function getAbout() {
        try {
            onSnapshot(doc(db, 'about', userId), doc => {
                if (doc.data()) {
                    setAbout(doc.data()['description']);
                } else {
                    setAbout(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAbout();
        getProfile();
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
        if (profile) {

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
                    <div style="background-color: #1e1b4b; text-center">
                        <p style="font-size: 30px; font-weight:bold;" class="mb-3 text-center">${profile.full_name}</p>
                        <div class="dashed-text-container mb-3" style="width: 100%;">
                            <div class="dashed-line"></div>
                            <span class="dashed-text ml-3 mr-3" style="font-weight:bold; font-size: 18px;">${profile.professionTitle}</span>
                            <div class="dashed-line"></div>
                        </div>
    
                        <!-- icons and text -->
                        <div class="row text-center">
                            <div class="col-lg-4 m-flex">
                                <i class="fa-solid fa-location-pin" style="color: #f59e0b;"></i>
                                <p>${profile.location}</p>
                            </div>
                            <div class="col-lg-4 m-flex">
                                <i class="fa-solid fa-envelope" style="color: #f59e0b;"></i>
                                <p>${profile.email}</p>
                            </div>
                            <div class="col-lg-4 m-flex">
                                <i class="fa-solid fa-phone" style="color: #f59e0b;"></i>
                                <p>${profile.phoneNumber}</p>
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
                                ${about}
                            </p>
                        </div>
                    </div>
                    <!-- top blue area -->

                </div>
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
            console.log(blob);
            FileSaver.saveAs(blob, "test_1234.pdf");
        }
    }

    return ( 
            <Button onClick={() => downloadPDF()} color="primary">
                {mDownload == true ? <Loading /> : ''}
                download pdf
            </Button>
    );
}
 
export default PdfGenerationTemplateOne;
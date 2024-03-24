'use client'

import { db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// const { db } = require("@/app/firebase/firebase");
// const { onSnapshot, doc } = require("firebase/firestore");

export function profileGlobal(userId) {
    try {
        let profile = {};

        const usb = onSnapshot(doc(db, 'profile', userId), (doc) => {
            if (doc.data()) {
                profile = doc.data();
            } else {
                profile = {};
            }
        });
        console.log(profile);
        return profile;
    } catch (error) {
        console.log(error);
    }
}
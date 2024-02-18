'use client'
import { useRouter } from "next/navigation";
import { Input } from "postcss";
import { useState } from "react";
import { Button, Modal } from "react-daisyui";

const Subscription = () => {
    const router = useRouter();

    async function initiatePayment() {
        try {
            let options = {
                method: 'POST',
                body: JSON.stringify({
                    'amount': 100,
                    'first_name': 'peter',
                    'last_name': 'wambua',
                    'email': 'peter@mail.com',
                    'subscription_type': 1,
                }),
            };
            let initPay = await fetch('http://localhost:3000/api/intasend', options);
            let res = await initPay.json();
            let { url } = res;
            router.push(url);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Button onClick={initiatePayment}>pay</Button>
            
        </div>
    );
}

export default Subscription;
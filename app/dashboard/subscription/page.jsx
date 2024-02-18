const Subscription = () => {

    async function initiatePayment() {
        let options = {
            method: 'POST',
            body: {
                'amount' : 100,
                'name' : 'peter',
                'email': 'peter@mail.com'
            }
        };
        let initPay = await fetch('http://localhost:3000/api/intasend', options);
    }

    return (  
        <div>
            Thank you, your payment is being processed hang on!
        </div>
    );
}
 
export default Subscription;
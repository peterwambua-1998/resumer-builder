# STEPS

## step 1
- collect First Name, Last Name and Email Address
- Collect payment information, such as Amount and Currency

## step 2
- once you have customer and payment details we package it and send it to pesapal (involves few steps)
- JWT are used for security reasons

## step 3

- When a request is posted, PesaPal will display a payments page.
- embed this payments page directly in your site

## step 4
- once customer is done with pesapal payment we can redirect to a thankyou page where you can query the payment status

## step 5
- When you receive an IPN notification from PesaPal, you need to query PesaPal for the payment status using the orderTrackingId that was sent with the notification

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiZWQ2MTkwMGYtZGNiMy00NjM2LWIxNGUtY2U1MGQwYzk2M2I1IiwidWlkIjoicWtpbzFCR0dZQVhUdTJKT2ZtN1hTWE5ydW9ac3JxRVciLCJuYmYiOjE3MDgxNjM3MjksImV4cCI6MTcwODE2NzMyOSwiaWF0IjoxNzA4MTYzNzI5LCJpc3MiOiJodHRwOi8vY3licWEucGVzYXBhbC5jb20vIiwiYXVkIjoiaHR0cDovL2N5YnFhLnBlc2FwYWwuY29tLyJ9.UMyopI6cfwVV5HGy0Bf2eQ_AmvrBkZUchZ6ESjghCs8
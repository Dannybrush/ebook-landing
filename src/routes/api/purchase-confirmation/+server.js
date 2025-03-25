import { SENDGRID_API_KEY, MY_EMAIL, STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit'
import sgMail from "@sendgrid/mail";
import Stripe from 'stripe';

sgMail.setApiKey(SENDGRID_API_KEY)
const PDF_GUIDE_URL = "https://narrify-public.s3.eu-central-1.amazonaws.com/sample.pdf"
const stripe = new Stripe(STRIPE_API_KEY)

export async function POST({ request }) {
    const body = await request.text(); // Get the raw body
    const signature = request.headers.get("stripe-signature") || "";

    try {
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            signature,
            STRIPE_WEBHOOK_SECRET
        );

        const customerEmail = stripeEvent.data.object.customer_details.email;
        const customerName = stripeEvent.data.object.customer_details.name;

        const response = await fetch(PDF_GUIDE_URL);
        const pdfBuffer = await response.arrayBuffer()
        const base64PDF = Buffer.from(pdfBuffer).toString("base64")

        const message = {
            to: customerEmail,
            from: MY_EMAIL,
            subject: "Your purchaase Confirmation : Complete Spain Relocation Guide",
            html:
                `<h1> Thank you for your purchase! </h1> 
        <p> Dear ${customerName}, </p> 
        
        <p> We appreciate your purchase of the <strong>Complete Spain Relocation Guide</strong>. We are confident that this ebook will provide you with the insights and advice you need to make your move to Spain as smooth and stress-free as possible </p> 
        <p> <strong>What happens next? </strong> </p> 

        <ul> 
            <li>You will find your ebook attached to this email </li>
            <li>A separate purchase confirmation has been sent to your email also.  </li>
            <li>If you have anyt questions or need further assistance, don't hesitate to reach out to us at ${MY_EMAIL}.  </li>
        </ul>

        <p>Thank you once again for choosing our guide. We wish you the best of luck on your journey to Spain! </p> 
        <p>Best Regards, <br/> Daniel Broomhead </p> 
        `,
            attachments: [{
                content: base64PDF,
                filename: "Digital Ebook - Spain Relocation.pdf",
                type: "application/pdf",
                disposition: "attachment",

            },],

        };
        await sgMail.send(message);

        return json({ response: "Email Sent." });
    }
    catch (err) {
        console.error("Webhook signature verification failed:", err);
        return json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        );
    }
}



/* stripe listen --forward-to localhost:5173/api/purchase-confirmation --events checkout.session.completed 


Done! The Stripe CLI is configured for Default sandbox with account id acct_1R6UYE8kjkm84s20

Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.
PS D:\Development\Tools\stripe> stripe listen --forward-to localhost:5173/api/purchase-confirmation --events checkout.session.completed
> Ready! You are using . */
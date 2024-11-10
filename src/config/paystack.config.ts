import { registerAs } from "@nestjs/config";

export default registerAs("Paystack", () => ({
    callbackURL: process.env.PAYSTACK_CALLBACK_URL,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
    secret: process.env.PAYSTACK_SECRET_KEY
}))
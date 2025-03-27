import {z} from "zod"

export const OrderFormSchema =  z.object({
    name:z.string().toLowerCase().min(3,"Name must be at least 3 characters"),
    email:z.string().email("Invalid email").toLowerCase(),
    phone:z.string().regex(/^6\d{8}$/,"Invalid phone number"),
    address:z.string().min(5,"Address must be at least 5 characters"),
})
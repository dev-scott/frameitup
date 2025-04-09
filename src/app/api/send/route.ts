import { Resend } from "resend";
import { NextResponse } from "next/server";
import { db } from "@/db";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend API Key:", process.env.RESEND_API_KEY?.slice(0, 5) + "...");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Here is the body", body);

    const order = await db.order.findFirst({
      where: { id: body.order.id, userId: body.order.userId },
      include: {
        configuration: true,
        shippingAddress: true,
        user: true,
      },
    });

    console.log("the order", order);

    
     const response =  await resend.emails.send({
        from: 'FrameitUp <hello.dev-scott.me>',
        to: [order!.user!.email!],
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({
          orderId: order!.id,
          orderDate: order!.createdAt.toLocaleDateString(),
          // @ts-ignore
          shippingAddress: {

            name: order!.shippingAddress!.name!,
            address: order!.shippingAddress!.address!,
           
          },
        }),
      })
      console.log("here is the response i have after sending the mail" , response)
      return response
  } catch (error) {
    return NextResponse.json({ error });
  }
}

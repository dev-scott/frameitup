"use server";

import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OrderStatus } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  console.log("my user ", user);

  const updatedOrder = await db.order.update({
    where: { id },
    data: { status: newStatus },
    include: {
      shippingAddress: true,
    }
  });

  if(user){

  await resend.emails.send({
    from: "Frameitup <hello.dev-scott.me>",
    to: [user.email!],
    subject: "Thanks for your order!",
    react: OrderReceivedEmail({
      id,
      orderDate: updatedOrder.createdAt.toLocaleDateString(),
      // @ts-ignore
      shippingAddress: {
        name: user.family_name!,
        address: updatedOrder.shippingAddress!.address!,
      },
    }),
  });
}

};

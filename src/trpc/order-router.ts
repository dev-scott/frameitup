import { TRPCError } from "@trpc/server";
import {
  ConfigurationSchema,
  ExtendedOrderFormSchema,
  OrderFormSchema,
} from "../lib/validators/order-validator";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { Resend } from "resend";
import { ReceiptEmailHtml } from "../components/emails/ReceiptEmail";
import { Product } from "@/payload-types";

const resend = new Resend(process.env.RESEND_API_KEY);

export const orderRouter = router({
  createOrder: privateProcedure
    .input(ExtendedOrderFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { user } = ctx;

        console.log("here is the order value in the trpc router", input);
        console.log("user", ctx);

        // Remplace `productIds` par `items` et extrait les IDs
        const { items, phone, address } = input;

        if (items.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        const productIds = items.map((item) => item.productId);

        const payload = await getPayloadClient();

        const { docs: products } = await payload.find({
          collection: "products",
          where: {
            id: {
              in: productIds,
            },
          },
        });
        console.log("list of product to order", products);

        console.log("in the try catch block");
        const order = await payload.create({
          collection: "orders",
          data: {
            _isPaid: false,
            //@ts-ignore
            user: user.id,
            //@ts-ignore
            phone: phone,
            address: address,
            // Ajout du champ `items` pour stocker les détails de la variante choisie
            //@ts-ignore
            items: items.map((item) => ({
              product: item.productId, // Assurez-vous d'utiliser productId pour la relation
              size: item.size,
              price: item.price,
            })),
          },
        });
        console.log("order created", order);

        const data = await resend.emails.send({
          from: "FrameitUp <support@mail.frameitup.store>",
          //@ts-ignore
          to: [user.email],
          subject: "Thanks for your order! This is your receipt.",
          html: ReceiptEmailHtml({
            date: new Date(),
            //@ts-ignore
            email: user.email,
            orderId: order.id as string,
            products: products as unknown as Product[],

            items: items,
          }),
        });

        return {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        };
      } catch (error) {
        console.log("error occurred", error);
        return {
          url: null,
        };
      }
    }),

  createConfiguration: privateProcedure
    .input(ConfigurationSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      console.log("here is the order value in the trpc router", input);
      console.log("user", ctx);
      return "test";
    }),
});

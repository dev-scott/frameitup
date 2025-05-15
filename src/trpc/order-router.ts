import { TRPCError } from "@trpc/server";
import {
  ExtendedOrderFormSchema,
  OrderFormSchema,
} from "../lib/validators/order-validator";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";

export const orderRouter = router({
  createOrder: privateProcedure
    .input(ExtendedOrderFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { user } = ctx;

        console.log("here is the order value in the trpc router", input);
        console.log("user", ctx);

        let { productIds } = input.productIds;
        console.log(productIds);

        if (productIds.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

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

        // const filteredProducts = products.filter((prod) =>
        //   Boolean(prod.priceId),
        // );
        // console.log("filtered products", filteredProducts);

        console.log("in the try catch block");
        const order = await payload.create({
          collection: "orders",
          data: {
            _isPaid: false,
            //@ts-ignore
            products: products.map((prod) => prod.id),
            user: user.id,
          },
        });
        console.log("order created", order);

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
});

"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
// import { stripe } from '@/lib/stripe'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

// export const createCheckoutSession = async ({
//   configId,
// }: {
//   configId: string
// }) => {
//   const configuration = await db.configuration.findUnique({
//     where: { id: configId },
//   })

//   if (!configuration) {
//     throw new Error('No such configuration found')
//   }

//   const { getUser } = getKindeServerSession()
//   const user = await getUser()

//   if (!user) {
//     throw new Error('You need to be logged in')
//   }

//   const { style, material } = configuration

//   let price = BASE_PRICE
//   if (style === 'MODERN') price += PRODUCT_PRICES.style.MODERN
//   if (style === 'RUSTIC') price += PRODUCT_PRICES.style.RUSTIC
//   if (style === 'INDUSTRIAL') price += PRODUCT_PRICES.style.INDUSTRIAL
//   if (material === 'METAL')
//     price += PRODUCT_PRICES.material.METAL
//   if (material === 'PLASTIC')
//     price += PRODUCT_PRICES.material.PLASTIC
//   if (material === 'COMPOSITE')
//     price += PRODUCT_PRICES.material.COMPOSITE

//   let order: Order | undefined = undefined

//   const existingOrder = await db.order.findFirst({
//     where: {
//       userId: user.id,
//       configurationId: configuration.id,
//     },
//   })

//   console.log(user.id, configuration.id)

//   if (existingOrder) {
//     order = existingOrder
//   } else {
//     order = await db.order.create({
//       data: {
//         amount: price,
//         userId: user.id,
//         configurationId: configuration.id,
//       },
//     })
//   }

//   const product = await stripe.products.create({
//     name: 'Custom iPhone Case',
//     images: [configuration.imageUrl],
//     default_price_data: {
//       currency: 'USD',
//       unit_amount: price,
//     },
//   })

//   const stripeSession = await stripe.checkout.sessions.create({
//     success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
//     payment_method_types: ['card', 'paypal'],
//     mode: 'payment',
//     shipping_address_collection: { allowed_countries: ['DE', 'US'] },
//     metadata: {
//       userId: user.id,
//       orderId: order.id,
//     },
//     line_items: [{ price: product.default_price as string, quantity: 1 }],
//   })

//   return { url: stripeSession.url }
// }

export const createOrder = async ({ configId,values }: { configId: string,values: { [key: string]: string } }) => {
  try {
    console.log("action for creating order");
    console.log("here is the values i get from the order creation form",values)

    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    });

    console.log(
      "here is the configuration id and the configuration data",
      configId,
      configuration
    );

    if (!configuration) {
      throw new Error("No such configuration found");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("here is the user", user);

    if (!user) {
      throw new Error("You need to be logged in");
    }

    const { style, material } = configuration;

    let price = BASE_PRICE;
    if (style === "MODERN") price += PRODUCT_PRICES.style.MODERN;
    if (style === "RUSTIC") price += PRODUCT_PRICES.style.RUSTIC;
    if (style === "INDUSTRIAL") price += PRODUCT_PRICES.style.INDUSTRIAL;
    if (material === "METAL") price += PRODUCT_PRICES.material.METAL;
    if (material === "PLASTIC") price += PRODUCT_PRICES.material.PLASTIC;
    if (material === "COMPOSITE") price += PRODUCT_PRICES.material.COMPOSITE;

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
      where: {
        userId: user.id,
        configurationId: configuration.id,
      },
    });

    console.log(user.id, configuration.id);

    if (existingOrder) {
      order = existingOrder;
    } else {
      console.log("create order if not exist");
      order = await db.order.create({
        data: {
          amount: price,
          userId: user.id,
          configurationId: configuration.id,
          ...values
        },
      });
    }

    return order;
  } catch (error) {
    console.log("Failed to create order", error);
  }
};

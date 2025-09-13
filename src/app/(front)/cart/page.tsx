"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import {
  ExtendedOrderFormSchema,
  OrderFormSchema,
} from "@/lib/validators/order-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Product } from "@/payload-types";

// Type pour la variante sélectionnée
type SelectedVariant = {
  size: string;
  price: number;
};

const Page = () => {
  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      phone: "",
      address: "",
    },
  });

  const { items, removeItem } = useCart();
  const router = useRouter();

  // État local pour gérer la variante sélectionnée pour chaque produit
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, SelectedVariant>
  >({});

  // Initialisation de l'état des variantes au chargement
  useEffect(() => {
    if (items.length > 0) {
      const initialVariants: Record<string, SelectedVariant> = {};
      items.forEach(({ product }) => {
        // Sélectionne la première variante par défaut
        if (product.variants && product.variants.length > 0) {
          initialVariants[product.id] = product.variants[0];
        }
      });
      setSelectedVariants(initialVariants);
    }
  }, [items]);

  const handlerOrder = (values: z.infer<typeof OrderFormSchema>) => {
    // Crée une liste d'objets avec l'ID du produit et la variante sélectionnée
    const orderItems = items.map(({ product }) => {
      const variant = selectedVariants[product.id];
      return {
        productId: product.id,
        size: variant.size,
        price: variant.price,
      };
    });

    // Envoi des données de la commande
    createOrder({ ...values, items: orderItems });
  };

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const { mutate: createOrder, isLoading: createOrderLoading } =
    trpc.order.createOrder.useMutation({
      onSuccess: ({ url }) => {
        toast.success("Order created successfully");
        if (url) router.push(url);
      },
    });

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calcul du total basé sur les prix des variantes sélectionnées
  const cartTotal = items.reduce((total, { product }) => {
    const selectedVariant = selectedVariants[product.id];
    return total + (selectedVariant?.price || 0);
  }, 0);

  const fee = 1;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/frameitup-empty-cart.jpg"
                    fill
                    loading="eager"
                    alt="empty shopping cart hippo"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category,
                  )?.label;

                  const { image } = product.images[0];
                  const selectedVariant = selectedVariants[product.id];

                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt="product image"
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Category: {label}
                              </p>
                            </div>

                            <div className="mt-2 flex w-full">
                              <label
                                htmlFor={`size-select-${product.id}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Size:
                              </label>
                              <select
                                id={`size-select-${product.id}`}
                                value={selectedVariant?.size || ""}
                                onChange={(e) => {
                                  const newSize = e.target.value;
                                  const newVariant = product.variants?.find(
                                    (v) => v.size === newSize,
                                  );
                                  if (newVariant) {
                                    setSelectedVariants({
                                      ...selectedVariants,
                                      [product.id]: newVariant,
                                    });
                                  }
                                }}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              >
                                {product.variants?.map((variant, index) => (
                                  <option key={index} value={variant.size}>
                                    {variant.size}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <p className="mt-2 text-sm font-medium text-gray-900">
                              {formatPrice(selectedVariant?.price || 0)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id)}
                                variant="ghost"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-100 px-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlerOrder)}>
                <div className="mt-6 space-y-4 mb-6 border-b pb-3 border-gray-200">
                  <h1 className="font-medium text-gray-900 text-lg">
                    Your shipping address
                  </h1>

                  <div>
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone field</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      {isMounted ? (
                        formatPrice(cartTotal)
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Flat Transaction Fee</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {isMounted ? (
                        formatPrice(fee)
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                      Order Total
                    </div>
                    <div className="text-base font-medium text-gray-900">
                      {isMounted ? (
                        formatPrice(cartTotal + fee)
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    disabled={items.length === 0 || createOrderLoading}
                    type="submit"
                    className="w-full"
                    size="lg"
                  >
                    {createOrderLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    ) : null}
                    Make order
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;

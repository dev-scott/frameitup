"use client";

import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, STYLES, MODELS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createOrder } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormSchema } from "@/lib/schema";
const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true));

  const { color, style, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // const { label: modelLabel } = MODELS.options.find(
  //   ({ value }) => value === model
  // )!

  let totalPrice = BASE_PRICE;
  if (material === "WOOD") totalPrice += PRODUCT_PRICES.material.WOOD;
  if (style === "CLASSIC") totalPrice += PRODUCT_PRICES.style.CLASSIC;

  const { mutate: createOrderFunction } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createOrder,
    onSuccess: () => {
      toast({
        title: "Redirecting to checkout",
        description: "Order created successfully.",
        variant: "destructive",
      });
      router.push(`/`);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleOrder = (values: z.infer<typeof OrderFormSchema>) => {
    if (user) {
      // create payment session
      createOrderFunction({ configId: id, values });
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col mb-20 items-start md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className=" h-[37.5rem] sm:col-span-12 row-span-2 md:col-span-9  text-base flex flex-col">

        <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOrder)}>

          <ScrollArea className="  relative flex-1 overflow-auto">
            <div className=" px-5">
              <div className="mt-6  ">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                  Your Frame
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-base">
                  <Check className="h-4 w-4 text-green-500" />
                  In stock and ready to ship
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                <div>
                  <p className="font-medium text-zinc-950">Highlights</p>
                  <ol className="mt-3 text-zinc-700 list-disc list-inside">
                    <li>Packaging made from recycled materials</li>
                    <li>5 year print warranty</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium text-zinc-950">Materials</p>
                  <ol className="mt-3 text-zinc-700 list-disc list-inside">
                    <li>High-quality, durable material</li>
                    <li>Scratch- and fingerprint resistant coating</li>
                  </ol>
                </div>
              </div>

                  <div className=" text-base  mt-8 flex flex-col justify-start gap-y-2">
                    <div className="flex flex-row">
                      <div className="flex flex-col gap-y-2 max-w-[500px] w-full mr-4">
                        {/* <span className="text-zinc-700">Enter your name</span>

                        <Input placeholder="Enter your name" /> */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 max-w-[500px] w-full">
                        {/* <span className="text-zinc-700">Enter your email</span>

                        <Input type="email" placeholder="Enter your name" /> */}
                          <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 w-full">
                      {/* <span className="text-zinc-700">Enter yor number</span>

                      <Input type="email" placeholder="Enter your name" /> */}

                      <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 w-full">
                      {/* <span className="text-zinc-700">Enter yor addresse</span>

                      <Textarea placeholder="Type your message here." /> */}

                      <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adresse</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter your adresse" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                  </div>
            

              <div className="mt-8">
                <div className="bg-gray-50 py-6 mr-8 sm:rounded-lg sm:py-8">
                  <div className="flow-root text-sm">
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Base price</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(BASE_PRICE / 100)}
                      </p>
                    </div>

                    {style === "MODERN" ? (
                      <div className="flex items-center justify-between py-1 mt-2">
                        <p className="text-gray-600">Textured finish</p>
                        <p className="font-medium text-gray-900">
                          {formatPrice(PRODUCT_PRICES.style.MODERN)}
                        </p>
                      </div>
                    ) : null}

                    {material === "METAL" ? (
                      <div className="flex items-center justify-between py-1 mt-2">
                        <p className="text-gray-600">
                          Soft polycarbonate material
                        </p>
                        <p className="font-medium text-gray-900">
                          {formatPrice(PRODUCT_PRICES.material.METAL)}
                        </p>
                      </div>
                    ) : null}

                    <div className="my-2 h-px bg-gray-200" />

                    <div className="flex items-center justify-between py-2">
                      <p className="font-semibold text-gray-900">Order total</p>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="mt-8 flex justify-end pb-12">
            <Button
              // onClick={() => handleOrder()}
              type="submit"
              className="px-4 sm:px-6 lg:px-8"
            >
              Make order <ArrowRight className="h-4 w-4 ml-1.5 inline" />
            </Button>
          </div>




          </form>
          </Form>



          
        </div>        
      </div>
    </>
  );
};

export default DesignPreview;

"use client";

import React from "react";
import { motion } from "motion/react";
import { Icons } from "@/components/Icons";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn, constructMetadata } from "@/lib/utils";
import { festive } from "@/lib/font";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import {
  SendMailCredentialsValidator,
  TSendMailCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
const Page = () => {
  const metadata = constructMetadata({
    title: "Contact Us",
    description:
      "Get in touch with FrameitUp today and let us know how we can help you make your photos shine. We're here to help you create memories that last a lifetime.",
    keywords:
      "FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp",
    image: "/thumbnail.png",
    icons: "/favicon.ico",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSendMailCredentialsValidator>({
    resolver: zodResolver(SendMailCredentialsValidator),
  });

  const { mutate: sendMail, isLoading } = trpc.sendMail.useMutation({
    onSuccess: async () => {
      toast.success("Your message has been sent.");
      reset();
      router.refresh();

      //   if (origin) {
      //     router.push(`/${origin}`);
      //     return;
      //   }

      router.push("/");
    },
    onError: (err) => {
      toast.error("An error has occurred while sending the message.");
    },
  });

  const onSubmit = ({
    name,
    email,
    message,
  }: TSendMailCredentialsValidator) => {
    sendMail({ name, email, message });
  };

  return (
    <section className="my-12">
      <div className="flex justify-center space-y-4 flex-col min-h-[400px] items-center w-full relative overflow-hidden [mask-image:linear-gradient(to_bottom,white,black,black,black,transparent)] ">
        <DotPattern />

        <motion.div
        //   animate={{
        //     scale: [1, 2, 2, 1, 1],
        //     rotate: [0, 0, 180, 180, 0],
        //     borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        //   }}
        //   transition={{
        //     duration: 2,
        //     ease: "easeInOut",
        //     times: [0, 0.2, 0.5, 0.8, 1],
        //     repeat: Infinity,
        //     repeatDelay: 1,
        //   }}
        >
          <Icons.logo className="h-12 w-auto" />
        </motion.div>
        <h1
          className={cn("font-bold text-5xl tracking-wider", festive.className)}
        >
          {" "}
          Contact our friendly team
        </h1>
        <span className="text-base text-muted-foreground">
          Let us know how we can help
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4 h-full  relative ">
          <MaxWidthWrapper className=" h-full flex flex-col justify-center items-center gap-2">
            <div className="flex-1 p-2">
              {/* <div>
                <h1 className=" font-bold text-5xl text-center">
                  Connect with us <br /> for your healthcare needs
                </h1>
                <span className="max-w-[500px] mt-4 letter-spacing font-sans text-center">
                  Reach outfor support , feedback , or to schedule an
                  appointment . fill out the form , and we&#39;ll promptly
                  assist you and confirm your visit with our healtcare
                  professionals
                </span>
              </div> */}
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-start  items-center flex-row gap-2 rounded-sm bg-blue-600/20 p-4">
                  <div className="bg-white rounded-full p-2 items-center justify-center">
                    <Mail className="h-8 " />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg h-full ">Address</h2>
                    <span className="font-sans">Douala , cameroun</span>
                  </div>
                </div>
                <div className="flex justify-start  items-center flex-row gap-2 rounded-sm bg-blue-600/20 p-4">
                  <div className="bg-white rounded-full p-2 items-center justify-center">
                    <Mail className="h-8 " />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg h-full ">Call Us</h2>
                    <span className="font-sans">+237 658 73 65 65</span>
                  </div>
                </div>
                <div className="flex justify-start  items-center flex-row gap-2 rounded-sm bg-blue-600/20 p-4">
                  <div className="bg-white rounded-full p-2 items-center justify-center">
                    <Mail className="h-8 " />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg h-full ">
                      Send us a Mail
                    </h2>
                    <span className="font-sans">frameitup05@gmail</span>
                  </div>
                </div>
                <div className="flex justify-start  items-center flex-row gap-2 rounded-sm bg-blue-600/20 p-4">
                  <div className="bg-white rounded-full p-2 items-center justify-center">
                    <Mail className="h-8 " />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg h-full ">Opening Time</h2>
                    <span className="font-sans">Mon-Thu : 8:00am - 4:00pm</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5 hidden md:flex h-full flex-col justify-between items-center p-2 flex-1 gap-3 bg rounded-sm">
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl text-center  ">
                  Send us a message
                </h1>
                <span className="max-w-[500px] mt-2 letter-spacing font-sans text-center">
                  Have a questions or ready to work with us ? We&#39;re here to
                  help reach <br /> out to us through the form belaw
                </span>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="name" className="text-base font-normal">
                      Name
                    </Label>
                    <Input
                      {...register("name")}
                      className={cn("py-8 px-6", {
                        "focus-visible:ring-red-500": errors.name,
                      })}
                      placeholder="Your name"
                    />
                    {errors?.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="name" className="text-base font-normal">
                      Email
                    </Label>
                    <Input
                      {...register("email")}
                      className={cn("py-8 px-6", {
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="you@example.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-1 py-2 w-full">
                  <Label htmlFor="message" className="text-base font-normal">
                    Message
                  </Label>
                  <Input
                    {...register("message")}
                    type="message"
                    className={cn("w-full py-8 px-6", {
                      "focus-visible:ring-red-500": errors.message,
                    })}
                    placeholder="message"
                  />
                  {errors?.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <div className="w-full mt-3">
                  <Button
                    className=" flex items-center w-full h-[54px] justify-center gap-2 group py-[10px] pl-[10px] pr-[10px] bg-secondary hover:bg-[#e7c819] rounded-[2px]"
                    variant={"ghost"}
                    onClick={() => console.log("test")}
                    disabled={isLoading}
                  >
                    <div className="flex-1 text-center tracking-[1.2px] text-white">
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Browse products
                    </div>
                    <div className="p-2 bg-black rounded-md">
                      <ArrowRight className=" text-white group-hover:rotate-45 group-hover:text-white transition-all duration-200 " />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </form>

      {/* <div className="w-full h-[400px] mt-8 bg-red-600"></div> */}
    </section>
  );
};

export default Page;

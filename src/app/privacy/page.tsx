import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const sections = [
  {
    id: "introduction",
    title: "1. Welcome to FrameitUP",
    description:
      "Welcome to our online store dedicated to custom photo and portrait frames. This Privacy Policy explains how we collect, use, and protect your personal information when you browse or make purchases on our platform.",
  },
  {
    id: "dataCollection",
    title: "2. Data Collection",
    description:
      "We collect essential information such as your name, shipping address, email, phone number, payment details, and customization preferences to fulfill your orders. We also gather technical data to enhance your shopping experience.",
  },
  {
    id: "dataUsage",
    title: "3. How We Use Your Data",
    description:
      "Your information is used to create your personalized frames, process your orders, deliver your products, send order confirmations, and keep you updated with our latest collections and offers. It also helps us improve our website and services.",
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking",
    description:
      "We use cookies to enhance site navigation, remember your preferences, and analyze website traffic. This helps us provide a smooth and personalized user experience.",
  },
  {
    id: "thirdParty",
    title: "5. Third-Party Services",
    description:
      "We may share your data with trusted third-party partners involved in payment processing, shipping logistics, and analytics. These partners only access necessary information and are required to protect your privacy.",
  },
  {
    id: "yourRights",
    title: "6. Your Rights & Control",
    description:
      "You have the right to access, correct, or delete your personal data at any time. You can also opt out of marketing communications or withdraw consent for specific data uses by contacting our support team.",
  },
];

const Page = () => {
  return (
    <section className="">
      {/* Hero Header */}
      <div className="w-full  h-[500px] bg-gradient-to-t from-black to-gray-900 text-white">
        <MaxWidthWrapper className=" h-full w-full flex items-start gap-y-3 justify-center flex-col">
          <h1 className="text-center  font-bold text-wrap text-5xl tracking-wide">
            Privacy Policy
          </h1>
          <p>
            {/* description */}
            This privacy policy will help you understand how FrameitUP uses and
            protects the data you provide to us
          </p>
        </MaxWidthWrapper>
      </div>
      {/* Main Content */}
      <MaxWidthWrapper className="my-20 flex flex-col md:flex-row gap-10">
        {/* Main Article */}
        <div className="flex-1 space-y-10">
          {sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-sans font-semibold text-gray-900 mb-4   ">
                {section.title}
              </h2>
              <p className="text-gray-700 font-sans leading-relaxed font-light text-base">
                {section.description}
              </p>
            </section>
          ))}
        </div>

        {/* Timeline Navigation */}
        <aside className="w-full md:w-64 md:sticky top-24 space-y-4">
          <nav className="border-l-2 pl-4 border-gray-200">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-gray-600 font-sans hover:text-black font-medium transition-all py-1"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
      </MaxWidthWrapper>
    </section>
  );
};

export default Page;

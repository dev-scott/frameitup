import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";

import * as React from "react";

interface EmailTemplateProps {
  actionLabel: string;
  buttonText: string;
  href: string;
}

const EmailTemplate = ({
  actionLabel = "action label example",
  buttonText = "test example",
  href = "https://google.com",
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>The marketplace for high-quality digital goods.</Preview>
      <Body style={main}>
        <Container style={container} className="p-6 bg-white text-black">
          <div className="w-full h-[150px] bg-green-400">
            <Img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/thumbnail.png`}
              className="w-full h-full object-cover object-center"
              alt="FrameitUp"
              style={logo}
            />
          </div>
          {/* <Img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/frameitup-email-sent.jpg`}
            width="150"
            height="150"
            alt="FrameitUp"
            style={logo}
          /> */}
          <Text
            style={paragraph}
            className="font-bold leading-tight text-base "
          >
            Hi there,
          </Text>
          <Text style={paragraph} className="text-base font-base ">
            Welcome to FrameitUp, the marketplace for high quality digital
            goods. Use the button below to {actionLabel}.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={href} className="bg-primary">
              {buttonText}
            </Button>
          </Section>
          <Text style={paragraph} className="font-bold">
            Best,
            <br />
            The FrameitUp team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you did not request this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const Page = (props: EmailTemplateProps) => {
  return (
    <>
      <EmailTemplate {...props} />
    </>
  );
};

export default Page;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  //   padding: "20px 0 48px",
};

const logo = {
  margin: "0 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "left" as const,
};

const button = {
  padding: "12px 12px",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

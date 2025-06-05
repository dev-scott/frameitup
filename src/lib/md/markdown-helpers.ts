"use server";
import fs from "fs";
import path from "path";

export const getPolicyContent = () => {
  const file = path.join(process.cwd(), "policy.md");
  const content = fs.readFileSync(file, "utf-8");
  console.log("content", content);
  return content;
};

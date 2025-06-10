import { z } from "zod";
import { execSync } from "child_process";

export const getNpmPackageInfo = {
  schema: {
    packageName: z.string()
  },
  handler: async ({ packageName }) => {
    const output = execSync(`npm view ${packageName}`, { encoding: "utf-8" });
    return { content: [{ type: "text", text: output }] };
  }
};

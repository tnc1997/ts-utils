import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: { array: "./src/index.ts" },
  format: ["esm", "cjs", "umd"],
  globalName: "array",
});

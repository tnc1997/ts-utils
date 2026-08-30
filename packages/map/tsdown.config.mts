import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: { map: "./src/index.ts" },
  format: ["esm", "cjs", "umd"],
  globalName: "map",
});

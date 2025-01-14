import path from "path";
import { defineConfig } from "father";

export default defineConfig({
  umd: {
    entry: {
      "src/vun-web": {},
      "src/vun": {
        platform: "node",
      },
      "src/vun-node": {
        platform: "node",
      },
    },
  },
  cjs: {},
});

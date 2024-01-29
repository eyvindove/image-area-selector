import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [
        react({
          jsxImportSource: "@emotion/react",
        }),
      ],
      resolve: {
        alias: [
          {
            find: "@",
            replacement: fileURLToPath(new URL("./src", import.meta.url)),
          },
        ],
      },
    };
  } else {
    return {
      base: "/image-area-selector",
      plugins: [
        react({
          jsxImportSource: "@emotion/react",
        }),
      ],
      resolve: {
        alias: [
          {
            find: "@",
            replacement: fileURLToPath(new URL("./src", import.meta.url)),
          },
        ],
      },
    };
  }
});

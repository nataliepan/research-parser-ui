import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://chat.openai.com",
        changeOrigin: true,
        //secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
//https://chat.openai.com/g/g-yKVz1Fq7X-research-pro

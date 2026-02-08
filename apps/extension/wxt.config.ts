import { defineConfig } from "wxt"

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "MindPocket",
    description: "Save web pages to MindPocket",
    permissions: ["activeTab", "storage", "notifications"],
    host_permissions: ["http://127.0.0.1:3000/*"],
  },
})

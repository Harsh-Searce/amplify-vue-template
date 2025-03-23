import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue"; // ✅ KEEP THIS, DON'T RENAME IT
import router from "./router"; // ✅ Use the router
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

const app = createApp(App);
app.use(router); // ✅ Use Vue Router
app.mount("#app");

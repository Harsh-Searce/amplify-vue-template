import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue"; // Home page
import TodoListPage from "./components/TodoListPage.vue"; // Todo List page

const routes = [
  { path: "/", component: Home },
  { path: "/todolist", component: TodoListPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

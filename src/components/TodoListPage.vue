<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useRouter } from "vue-router";

const client = generateClient<Schema>();
const router = useRouter();

// List of todos
const todos = ref<Array<Schema["Todo"]["type"]>>([]);

async function fetchTodos() {
  try {
    const { data } = await client.models.Todo.list();
    todos.value = data;
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
}

onMounted(fetchTodos);
</script>

<template>
  <main>
    <h1>All Todos</h1>
    
    <!-- Back to Home -->
    <button @click="router.push('/')">🏠 Back to Home</button>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.content }}
      </li>
    </ul>
  </main>
</template>

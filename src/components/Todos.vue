<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);
const newTodoContent = ref(""); // New todo input

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items }) => {
      todos.value = items;
    },
  }); 
}


function createTodo() {
  if (!newTodoContent.value.trim()) return; // Prevent empty todos

  client.models.Todo.create({
    content: newTodoContent.value
  }).then(() => {
    newTodoContent.value = ""; // Clear input after adding
    listTodos();
  });
}
 
function deleteTodo(id: string) {
  client.models.Todo.delete({ id }).then(() => {
    listTodos();
  });
}

// fetch todos when the component is mounted
onMounted(() => {
  listTodos();
});
</script>

<template>
  <main>
    <h1>My Todos</h1>

    <!-- New Input Box for Adding Todos -->
    <div>
      <input v-model="newTodoContent" placeholder="Enter a new todo..." />
      <button @click="createTodo">+ Add</button>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="deleteTodo(todo.id)">
        {{ todo.content }}
      </li>
    </ul>

    <div class="info-box">
      Finished a task? Click to remove it!
    </div>
  </main>
</template>

<style scoped>
/* Add some spacing & styling */
input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #0a0a0a;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

.info-box {
  margin-top: 12px;
  font-style: italic;
  color: #666;
}
</style>

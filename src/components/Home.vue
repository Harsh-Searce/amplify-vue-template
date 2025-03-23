<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { useRouter } from "vue-router";
import Todos from "./Todos.vue"

const router = useRouter();
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId }}</h1>
        <Todos />
        <!-- Navigate to Todo List -->
        <button @click="router.push('/todolist')">📋 View All Todos</button>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

<script setup lang="ts">
import BooksTable from '@/components/BooksTable.vue';
import {ref} from 'vue';

const searchInput = ref('');
const currentSearch = ref('');

function searchApplied(): void {
  currentSearch.value = searchInput.value;
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">Bookstore manager</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <form class="form-inline mt-2 mt-md-0 ml-auto">
        <input v-model="searchInput" @keydown.enter.prevent="searchApplied" class="form-control mr-sm-2" type="text"
               placeholder="Search" aria-label="Search">
        <button @click="searchApplied" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
      </form>
    </div>
  </nav>
  <main role="main" class="container">
    <h2 class="mt-5 mb-5">Manage books info, update stock information</h2>
    <BooksTable :current-search="currentSearch"></BooksTable>
  </main>

</template>

<style scoped>
</style>

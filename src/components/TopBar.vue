<script setup lang="ts">
import router from '@/router';
import {ref} from 'vue';

const searchInput = ref('');

function searchApplied(): void {
  if (searchInput.value) {
    router.push({
      name: 'books', query: {
        search: searchInput.value
      }
    });
  } else {
    router.push({name: 'books'})
  }
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
               placeholder="Search by title or author" aria-label="Search">
        <button @click="searchApplied" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
      </form>
    </div>
  </nav>
</template>


<style scoped>

</style>

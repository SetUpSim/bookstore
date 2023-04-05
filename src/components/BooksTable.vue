<script setup lang="ts">
import type {ClickRowArgument, Header, Item} from 'vue3-easy-data-table';
import {onMounted, ref, watch} from 'vue';
import {BookService} from '@/service/bookService';
import router from '@/router';

const LOAD_INTERVAL = 10000; // milliseconds

const props = defineProps({
  search: {
    required: false,
    type: String
  }
})

const headers: Header[] = [
  {text: 'ID', value: 'id'},
  {text: 'Title', value: 'title'},
  {text: 'Author', value: 'author'},
  {text: 'Description', value: 'description', width: 300},
  {text: 'Left in stock', value: 'stock'}
];

const items = ref(Array<Item>())
let lastLoadInterval: number | undefined;

async function updateBooks(search: string | undefined) {
  clearInterval(lastLoadInterval);
  if (!search) {
    console.log("Initial get all books")
    items.value = await BookService.getBooks();
    lastLoadInterval = setInterval(async () => {
      console.log("Interval get all books")
      items.value = await BookService.getBooks();
    }, LOAD_INTERVAL);
  } else {
    console.log("Initial search books")
    items.value = await BookService.searchBooks(search);
    lastLoadInterval = setInterval(async () => {
      console.log("Interval search books")
      items.value = await BookService.searchBooks(search);
    }, LOAD_INTERVAL);
  }
}

watch(() => props.search, (newSearch, oldSearch) => {
  if (oldSearch !== newSearch) {
    updateBooks(newSearch);
  }
});

function rowSelected(item: ClickRowArgument) {
  router.push({name: 'details', params:
        {
          id: item.id
        }});
}

onMounted(() => {
  updateBooks(props.search);
});

</script>
<template>
  <h2 class="mt-5 mb-4">Manage books info, update stock information</h2>
  <p v-if="props.search" class="mb-3">Current search term is: {{ props.search }}</p>
  <DataTable
      :headers="headers"
      :items="items"
      @click-row="rowSelected"
  />
</template>


<style scoped>

</style>

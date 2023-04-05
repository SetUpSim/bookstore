<script setup lang="ts">
import type {ClickRowArgument, Header, Item} from 'vue3-easy-data-table';
import {onMounted, ref, watch, watchEffect} from 'vue';
import {BookService} from '@/service/bookService';
// import router from '@/router';

const props = defineProps({
  search: {
    required: true,
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

// const currentSearch = ref<string | undefined>('');
const items = ref(Array<Item>())

async function updateBooks(search: string | undefined) {
  if (!search) {
    items.value = await BookService.getBooks();
  } else {
    items.value = await BookService.searchBooks(search);
  }
}

// watch(currentSearch, async (newSearch, oldSearch) => {
//   if (oldSearch !== newSearch) {
//     await updateBooks();
//   }
// });

watch(() => props.search, (newSearch, oldSearch) => {
  if (oldSearch !== newSearch) {
    updateBooks(newSearch);
  }
});

function rowSelected(item: ClickRowArgument) {
  // router.push('/books/' + item.id);
  console.log(item)
}

onMounted(() => {
  updateBooks(props.search);
});

</script>
<template>
  <h2 class="mt-5 mb-4">Manage books info, update stock information</h2>
  <p v-if="props.search" class="mb-3">Current search term is: {{props.search}}</p>
  <DataTable
      :headers="headers"
      :items="items"
      @click-row="rowSelected"
  />

</template>


<style scoped>

</style>

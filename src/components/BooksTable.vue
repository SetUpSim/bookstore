<script setup lang="ts">
import type {Header, Item} from 'vue3-easy-data-table';
import {onMounted, ref, watch} from 'vue';
import {BookService} from '@/service/bookService';

const props = defineProps({
  currentSearch: {
    required: false,
    type: String
  }
});

const headers: Header[] = [
  {text: 'ID', value: 'id'},
  {text: 'Title', value: 'title'},
  {text: 'Author', value: 'author'},
  {text: 'Description', value: 'description', width: 300}
];

const items = ref(Array<Item>())
async function updateBooks() {
  if (!props.currentSearch) {
    items.value = await BookService.getBooks();
  } else {
    items.value = await BookService.searchBooks(props.currentSearch);
  }
}

watch(props.currentSearch, (value, oldValue, onCleanup) => {
  if (value && value !== oldValue) {
    updateBooks();
  }
});

onMounted(() => {
  updateBooks();
});
</script>
<template>
  <p>Current search term is: {{props.currentSearch}}</p>
  <DataTable
      :headers="headers"
      :items="items"
  />
</template>


<style scoped>

</style>

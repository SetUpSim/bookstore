<script setup>
import {onMounted, ref} from "vue";
import {BookService} from "@/service/bookService";
import router from "@/router";

const props = defineProps({
  bookId: {
    required: false,
    type: String
  }
})

const book = ref(null)

async function getBook(id) {
  return await BookService.getBookById(id);
}

function cancelEdit() {
  const result = confirm("Do you want to cancel editing book details? All unsaved changes will be lost.")
  if (result) {
    router.go(-1);
  }
}

onMounted(async () => {
  book.value = await getBook(props.bookId);
});

</script>
<template>
  <template v-if="book">
    <p>Title: {{ book.title }}</p>
    <p>Author: {{ book.author }}</p>
    <p>Description: {{ book.description }}</p>
    <p>Stock: {{ book.stock }}</p>
    <button @click="cancelEdit" class="btn btn-danger">Cancel</button>
  </template>
  <h2 v-else class="mt-5">
    No book found
  </h2>
</template>


<style scoped>
h2 {
  text-align: center;
}
</style>

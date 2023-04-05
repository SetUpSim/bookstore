<script setup>
import {onMounted, ref} from "vue";
import {BookService} from "@/service/bookService";

const props = defineProps({
  bookId: {
    required: false,
    type: Number
  }
})

const book = ref(null)

async function getBook(id) {
  return await BookService.getBookById(id);
}

onMounted(async () => {
  book.value = await getBook(props.bookId);
});

</script>
<template>
  <p>Title: {{book?.title}}</p>
  <p>Author: {{book?.author}}</p>
  <p>Description: {{book?.description}}</p>
  <p>Stock: {{book?.stock}}</p>
</template>


<style scoped>

</style>

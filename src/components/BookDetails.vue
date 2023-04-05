<script setup lang="ts">
import {BookService} from "@/service/bookService";
import type BookModel from '@/model/bookModel';
import router from "@/router";
import {onMounted, ref} from 'vue';

const props = defineProps({
  bookId: {
    required: false,
    type: String
  }
})

const book = ref<BookModel>();

function navigateToTable() {
  router.push({name: 'books'});
}

function cancelEdit() {
  const result = confirm("Do you want to cancel editing book details? All unsaved changes will be lost.")
  if (result) {
    navigateToTable();
  }
}

function saveBook() {
  if (!book.value) {
    return
  }

  if (book.value?.id === -1) {
    BookService.createBook(book.value).then((res) => {
      if (res.status === 201) {
        alert('Book was created saved successfully');
        router.push({name: 'details', params: {
            id: res.newId
          }});
      } else {
        alert('Error while saving book details! Error code: ' + status);
      }
    });
  } else {
    BookService.updateBook(book.value).then((status) => {
      if (status === 200) {
        alert('Book details were saved successfully');
      } else {
        alert('Error while saving book details! Error code: ' + status);
      }
    });
  }
}

function deleteBook() {
  if (!book.value) {
    return
  }

  BookService.deleteBook(book.value.id).then((status) => {
    if (status === 200) {
      alert('Book with id ' + book.value?.id + ' was deleted successfully.');
      navigateToTable();
    } else {
      alert('Error while deleting book! Error code: ' + status);
    }
  });

}

onMounted(async () => {
  const bookId = parseInt(props.bookId ?? "");
  if (isNaN(bookId) || !bookId || bookId < -1) {
    return;
  }

  if (bookId === -1) {
    book.value = {
      id: -1,
      title: "",
      author: "",
      description: "",
      stock: 0
    }
  } else {
    BookService.getBookById(bookId).then((res) => {
      book.value = res;
    });
  }
});

</script>
<template>
  <form v-if="book" @submit.prevent="saveBook">
    <div class="form-group mt-4">
      <label>Title:</label>
      <input v-model="book.title" class="form-control" type="text" required>
    </div>
    <div class="form-group">
      <label>Author:</label>
      <input v-model="book.author" type="text" class="form-control" required>
    </div>
    <div class="form-group">
      <label>Description:</label>
      <textarea v-model="book.description" name="bookdescription" id="bookdescription" cols="20" rows="5"
                class="form-control"></textarea>
    </div>
    <div class="form-group">
      <label>Left in stock:</label>
      <input v-model="book.stock" type="number" class="form-control" min="0">
    </div>
    <button @click="cancelEdit" class="btn btn-dark float-left" type="button">Cancel</button>
    <button @click="deleteBook" :disabled="book.id < 0" class="btn btn-danger float-left ml-3" type="button">Delete book</button>
    <button class="btn btn-success float-right">Save</button>
  </form>
  <h2 v-else class="mt-5">
    No book found
  </h2>
</template>


<style scoped>
h2 {
  text-align: center;
}
</style>

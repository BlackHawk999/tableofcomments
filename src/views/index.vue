<script lang="ts" setup>
  import DataTable from "../components/DataTable.vue";
  import Navbar from "../components/Navbar.vue";
  import Pagination from "../components/Pagination.vue";
  import { ref, computed, onMounted, watch } from "vue";
  import { useCommentsStore } from '../stores/comments';
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const commentsStore = useCommentsStore()
  
  const comments = ref([])
  const currentPage = ref(1)
  const limit = ref(10)
  const tableHead = [
    {
      value: "index",
      text: "№",
      sort: false
    },
    {
      value: "id",
      text: "Id",
      sort: true
    },
    {
      value: "name",
      text: "Name",
      sort: true
    },
    {
      value: "email",
      text: "Email",
      sort: true
    },
  ]
  
  const computedComments = computed(() => {
    const currentIndex = (currentPage.value - 1) * limit.value;
    return commentsStore.comments.slice(currentIndex, currentIndex + limit.value);
  })
  
  function sortComments(func) {
    commentsStore.comments.sort(func)
  }
  
  function onPageChange(page) {
    console.log('page: ', page) 
    currentPage.value = page;
  }

  const computedPages = computed(() => {
    return Math.ceil(commentsStore.comments.length/limit.value)
  })

  onMounted(() => {
    commentsStore.getAllComments()
  })
</script>

<template>
  <div class="page-wrapper">
    <navbar />
    <data-table
      :tHead="tableHead"
      :tBody="computedComments"
      :currentPage="currentPage"
      :limit="limit"
      @table:sort="sortComments"
    />
    <pagination
      :currentPage="currentPage"
      :totalPages="computedPages"
      :total="commentsStore.comments.length"
      @pagechanged="onPageChange"
    />
    <pre>{{ commentsStore.comments.length }}</pre>
    <pre>{{ limit }}</pre>
    <pre>{{ currentPage }}</pre>
  </div>
</template>



<style lang="scss" scoped></style>

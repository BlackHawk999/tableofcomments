<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
  const props = defineProps({
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  })
  const emit = defineEmits(['pagechanged'])

    function previousPage () {
      emit("pagechanged", props.currentPage - 1);
    }
    function nextPage () {
      emit("pagechanged", props.currentPage + 1);
    }
    function isPageActive (page) {
      return props.currentPage === page;
    }

    const isInLastPage = computed(() => {
      props.currentPage < props.totalPages;
      console.log('total-pages: ', props.totalPages);
      
    })
    const startPage = computed (() => {
      if (props.currentPage === 1) {
        return 1;
      }
      if (props.currentPage === props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
      }
      return props.currentPage - 1;
    })
    const endPage= computed(() => {
      Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        props.totalPages
      );
    })
    const pages = computed(() => {
      const range = [];
      for (let i = startPage; i <= endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i.value === props.currentPage,
        });
      }
      return range;
    })
</script>

<template>
  <div class="pagination-wrapper">
    <button
      @click.prevent="previousPage"
      :disabled="currentPage === 1"
      class="arrow"
    >
      <img src="/images/left-arrow.svg" alt="" />
    </button>
    <p
      v-for="(page, idx) in pages"
      :key="idx + 1"
      :class="{ active: isPageActive(page.name) }"
    >
      {{ page.name }}
    </p>
    <button
      @click.prevent="nextPage"
      :disabled="isInLastPage!"
      class="arrow right"
    >
      <img src="/images/left-arrow.svg" alt="" />
    </button>
  </div>
</template>


<style lang="scss">
.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    width: 45px;
    height: 20px;
    border: 1px solid #4670fbb6;
    border-radius: 4px;
    background: transparent;
    outline: none;
    cursor: pointer;

    &.right {
      transform: rotate(180deg);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  p {
    width: 50px;
    height: 20px;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #466ffb;
    text-align: center;
    border: 1px solid #4670fbb6;
    border-radius: 4px;

    &.active {
      color: #fff;
      background: #5667d7;
    }
  }
}
</style>

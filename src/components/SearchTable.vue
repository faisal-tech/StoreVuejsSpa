<template>
  <div class="row d-flex justify-content-between">
    <div class="col-3">
      <label for="search">Search</label>
      <input
        type="text"
        name="search"
        class="form-control"
        id="search"
        @input="value => doSearch(table.offset, table.limit, table.sortable.order, table.sortable.sort, value)"
      />
    </div>
    <div class="col-3">
      <slot></slot>
    </div>
  </div>
  <div class="mt-2">
    <TableLite
      :is-slot-mode="true"
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="itemsList"
      :total="itemsListCount"
      :sortable="table.sortable"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
      @row-clicked="handleRowClick"
      
    >
    
    </TableLite>
  </div>
</template>

<script>
import TableLite from "vue3-table-lite";
import { reactive, ref } from "vue";
import { getItems } from '@/api/search.js';

export default {
  name: 'SearchTable',
  components: { TableLite },
  props: {
    searchUrl: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  emits :['row-clicked'],
  setup(props,{emit}) {
    const itemsList = ref([]);
    const itemsListCount = ref(0);
    const table = reactive({
      isLoading: false,
      columns: props.columns,
      totalRecordCount: 0,
      sortable: { order: "id", sort: "asc" },
    });

    const doSearch = async (offset, limit, column, order, query) => {
      table.isLoading = true;
      table.offset = offset;
      table.limit = limit;
      try {
        let response = await getItems(props.searchUrl, {
          offset: offset,
          pageSize: limit,
          searchQuery: query?.target.value ?? null,
          column: column,
          order: order,
        });
        itemsList.value = response.data.data.items;
        itemsListCount.value = response.data.data.itemsCount;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        table.isLoading = false;
      }
    };

    const tableLoadingFinish = () => {
      table.isLoading = false;
    };

    doSearch(0, 10, null);

    const handleRowClick = (row) => {
      emit('row-clicked',row)
    };

    return {
      table,
      doSearch,
      itemsList,
      itemsListCount,
      tableLoadingFinish,
      handleRowClick,
    };
  },
};
</script>

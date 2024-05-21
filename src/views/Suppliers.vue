<script>
import SearchTable from "@/components/SearchTable.vue";
import {ref} from 'vue'
import AddSupplier from '@/components/supplier/AddSupplier.vue'

export default {
  name: 'Supplier',
  components: { SearchTable,AddSupplier },


  setup() {
    const dialog = ref(false);
    const editSupplier = ref(null);
    const searchTableKey = ref(1);

    const columns = [
      { label: "ID", field: "id", width: "3%", sortable: true, isKey: true },
      { label: "Supplier Name", field: "name", width: "15%", sortable: true },
      { label: "Amount of products", field: "productCount", width: "10%", sortable: true }];


    const searchUrl = "api/supplier/suppliersList";

    const opendDialog =()=>{
      editSupplier.value = null
      dialog.value = true
    };
    const closeDialog = () => {
      searchTableKey.value = searchTableKey.value + 1;
      dialog.value = false;
    };
    const editRow = (row) => {
      editSupplier.value = row;
      dialog.value=true
    };

    return {
      columns,
      searchUrl,
      editRow,
      opendDialog,
      closeDialog,
      editSupplier,
      searchTableKey,
      dialog,
    };
  }
}
</script>
<template>
    <v-dialog v-model="dialog" max-width="900px">
    <AddSupplier :show-add-supplier="dialog" :edit-supplier="editSupplier" @close="closeDialog"></AddSupplier>
  </v-dialog>
  <div class="mt-2">
    <SearchTable :key="searchTableKey" :search-url="searchUrl" :columns="columns" @row-clicked="editRow">
      <button class="form-control mt-4" @click="opendDialog">
      ِAdd Supplier
    </button>
  </SearchTable>

  </div>
</template>

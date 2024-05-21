<template>
  <v-dialog v-model="dialog" max-width="900px">
    <AddProduct :show-add-product="dialog" :edit-product="editProduct" @close="closeDialog"></AddProduct>
  </v-dialog>

  <SearchTable
    :key="searchTableKey"
    :search-url="searchUrl"
    :columns="columns"
    @row-clicked="editRow"
  >
    

    <button class="form-control mt-5" @click="opendDialog">
      Add Product
    </button>
  </SearchTable>
</template>

<script>
import SearchTable from '@/components/SearchTable.vue';
import AddProduct from '@/components/products/AddProduct.vue';
import { ref } from 'vue';

export default {
  name: 'Products',
  components: { SearchTable, AddProduct },

  setup() {
    const dialog = ref(false);
    const editProduct = ref(null);
    const searchTableKey = ref(1);
    const columns = [
      { label: "ID", field: "id", width: "3%", sortable: true, isKey: true },
      { label: "Name", field: "name", width: "10%", sortable: true },
      { label: "Supplier Name", field: "supplierName", width: "15%", sortable: false },
      { label: "Price", field: "unitPrice", width: "15%", sortable: true },
      { label: "Amount available", field: "unitsInStock", width: "15%", sortable: true },
      { label: "Unit", field: "unit", width: "15%", sortable: false },
    ];
    const searchUrl = "api/product/productsList";
    const opendDialog =()=>{
      editProduct.value = null
      dialog.value = true
    };
    const editRow = (row) => {
      editProduct.value = row;
      dialog.value=true
    };
    
    const closeDialog = () => {
      searchTableKey.value = searchTableKey.value + 1;
      dialog.value = false;
    };

    return {
      searchUrl,
      columns,
      editProduct,
      dialog,
      closeDialog,
      opendDialog,  
      searchTableKey,
      editRow ,
    };
  }
};
</script>

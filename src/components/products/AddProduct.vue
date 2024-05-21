<script>
import { ref, onMounted } from 'vue'
import { getUnitLookups, createProduct, editProduct, deleteProduct } from '@/api/products.js'
import { getSuppliers } from '@/api/suppliers.js'
import { successMsg, confirmationMsg, errorMsg } from '@/utils/alerts.js'
export default {
  name: 'AddProduct',

  props: {
    showAddProduct: {
      type: Boolean,
      default: false
    },
    editProduct: {
      type: Object,
      default: {
        unitId: null,
        reorderLimit: null,
        name: null,
        unitPrice: null,
        unitsInStock: null,
        orderUnit: null,
        supplierId: null
      }
    }
  },

  setup(props, { emit }) {
    const product = ref({ ...props.editProduct })
    const unitLookups = ref([])
    const supplierLookups = ref([])
    const loading = ref(false)
    const editMode = props.editProduct?.id ? true : false

    onMounted(async () => {
      try {
        const unitResponse = await getUnitLookups()
        const supplierResponse = await getSuppliers({
          offset: 0,
          pageSize: 100,
          SearchQuery: null
        })
        unitLookups.value = unitResponse.data.data
        supplierLookups.value = supplierResponse.data.data.items
      } catch (error) {
        console.error('Failed to fetch lookups:', error)
      }
    })

    const saveProduct = async () => {
      loading.value = true
      try {
        let response = editMode
          ? await editProduct(product.value)
          : await createProduct(product.value)

        if (response.data.data == true) {
          successMsg('Product Saved successfuly')
        }

        console.log(response)
        emit('close') // Emit close event to close the dialog
      } catch (error) {
        errorMsg(error.message)
      } finally {
        loading.value = false
      }
    }

    const removeProduct = async () => {
      loading.value = true
      try {
        if (await confirmationMsg()) {
          let response = await deleteProduct(product.value.id)
          if (response.data.data == true) {
            successMsg('Product deleted successfuly')
          }
          emit('close') // Emit close event to close the dialog
        }
      } catch (error) {
        console.error('Failed to save product:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      unitLookups,
      supplierLookups,
      product,
      loading,
      saveProduct,
      removeProduct,
      editMode,
      showAddProduct: props.showAddProduct // Make the prop available in the template
    }
  }
}
</script>

<template>
  <v-dialog v-model="showAddProduct" width="auto">
    <v-card max-width="400" prepend-icon="mdi-update" title="Add Product">
      <form class="m-4" @submit.prevent="saveProduct">
        <div class="mb-3">
          <label for="productName" class="form-label">Name:</label>
          <input type="text" class="form-control" v-model="product.name" id="productName" />
        </div>
        <div class="mb-3">
          <label for="productPrice" class="form-label">Price:</label>
          <input
            type="number"
            class="form-control"
            v-model="product.unitPrice"
            min="1"
            id="productPrice"
          />
        </div>
        <div class="mb-3">
          <label for="productUnit" class="form-label">Unit:</label>
          <select
            class="form-select"
            :key="unitLookups.length"
            v-model="product.unitId"
            id="productUnit"
          >
            <option v-for="unit in unitLookups" :key="unit.name" :value="unit.id">
              {{ unit.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="SupplierId" class="form-label">Supplier:</label>
          <select
            class="form-select"
            :key="supplierLookups.length"
            v-model="product.supplierId"
            id="SupplierId"
          >
            <option v-for="supplier in supplierLookups" :key="supplier.name" :value="supplier.id">
              {{ supplier.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="productStock" class="form-label">Stock Amount:</label>
          <input
            type="number"
            class="form-control"
            v-model="product.unitsInStock"
            min="1"
            id="productStock"
          />
        </div>
        <div class="mb-3">
          <label for="productStock" class="form-label">Order Amount:</label>
          <input
            type="number"
            class="form-control"
            v-model="product.orderUnit"
            min="1"
            id="productStock"
          />
        </div>
        <div class="mb-3">
          <label for="productReorderLimit" class="form-label">Limit to reorder:</label>
          <input
            type="number"
            class="form-control"
            v-model="product.reorderLimit"
            min="0"
            id="productReorderLimit"
          />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary text-white" :disabled="loading">Save</button>
          <button
            type="button"
            @click="removeProduct"
            v-if="editMode"
            class="btn btn-danger text-white"
          >
            delete
          </button>
          <button type="button" class="btn btn-secondary text-white" @click="$emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

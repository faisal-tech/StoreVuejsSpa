<script>
import { ref } from 'vue'
import { createSupplier, editSupplier, deleteSupplier } from '@/api/suppliers.js'
import { successMsg, confirmationMsg, errorMsg } from '@/utils/alerts.js'
export default {
  name: 'AddSupplier',

  props: {
    showAddSupplier: {
      type: Boolean,
      default: false
    },
    editSupplier: {
      type: Object,
      default: {
        id: null,
        name: null
      }
    }
  },

  setup(props, { emit }) {
    const supplier = ref({ ...props.editSupplier })
    const loading = ref(false)
    const editMode = props.editSupplier?.id ? true : false

    const saveSupplier = async () => {
      loading.value = true
      try {
        let response = editMode
          ? await editSupplier(supplier.value)
          : await createSupplier(supplier.value)
        if (response.data.data == true) {
          successMsg('Supplier Saved successfuly')
        }
        console.log(response)
        emit('close') // Emit close event to close the dialog
      } catch (error) {
        errorMsg(error.message)
      } finally {
        loading.value = false
      }
    }

    const removeSupplier = async () => {
      loading.value = true
      try {
        if (await confirmationMsg()) {
          let response = await deleteSupplier(supplier.value.id)
          if (response.data.data == true) {
            successMsg('Supplier deleted successfuly')
          }
          console.log(response)
          emit('close') // Emit close event to close the dialog
        }
      } catch (error) {
        console.error('Failed to save supplier:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      supplier,
      loading,
      saveSupplier,
      removeSupplier,
      editMode,
      showAddSupplier: props.showAddSupplier
    }
  }
}
</script>

<template>
  <v-dialog v-model="showAddSupplier" width="auto">
    <v-card max-width="400" prepend-icon="mdi-update" title="Add Supplier">
      <form class="m-4" @submit.prevent="saveSupplier">
        <div class="mb-3">
          <label for="supplierName" class="form-label">Name:</label>
          <input type="text" class="form-control" v-model="supplier.name" id="supplierName" />
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary text-white" :disabled="loading">Save</button>
          <button
            type="button"
            @click="removeSupplier"
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

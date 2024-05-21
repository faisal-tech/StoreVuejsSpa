<template>
  <StatisticCard
    :is-pie-chart="true"
    :title="'Largest Suppliers'"
    :searchUrl="'api/Supplier/GetLargestSupplier'"
    :data-keys="suppliersDataKeys"
  ></StatisticCard>
  <StatisticCard
    :is-bar-chart="true"
    :title="'Product with the minimum orders'"
    :searchUrl="'api/Product/ProductsWithMinimumOrders'"
    :data-keys="minimumDataKeys"
  ></StatisticCard>
  <StatisticCard
    :is-bar-chart="true"
    :title="'Product to reorders'"
    :searchUrl="'api/Product/ProductsToReorder'"
    :data-keys="reorderDataKeys"
  ></StatisticCard>
</template>

<script>
import StatisticCard from '@/components/statistics/StatisticCard.vue'

export default {
  name: 'Statistics',
  components: { StatisticCard },

  setup() {
    const suppliersDataKeys = ['name', 'productCount']
    const minimumDataKeys = ['name', 'orderUnit']
    const reorderDataKeys = ['name', 'stockUnit', 'reorderLimit']

    return { suppliersDataKeys, minimumDataKeys, reorderDataKeys }
  }
}
</script>

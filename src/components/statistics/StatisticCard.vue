<template>
  <div class="card">
    <h5 class="card-header">{{ title }}</h5>
    <div class="card-body">
      <PieChart v-if="isPieChart && data.length > 0" :data="data" :data-keys="dataKeys" />
      <BarChart v-if="isBarChart && data.length > 0" :data="data" :data-keys="dataKeys" />
      <LineChart v-if="isLineChart && data.length > 0" :data="data" :data-keys="dataKeys" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import PieChart from '@/components/statistics/PieChart.vue'
import BarChart from '@/components/statistics/BarChart.vue'
import LineChart from '@/components/statistics/LineChart.vue'

import { getStatistic } from '@/api/statistics.js'

export default {
  components: { PieChart, LineChart, BarChart },

  name: 'StatisticCard',

  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    searchUrl: {
      type: String,
      default: null
    },
    dataKeys: {
      type: Array,
      default: () => []
    },
    isPieChart: {
      type: Boolean,
      default: false
    },
    isBarChart: {
      type: Boolean,
      default: false
    },
    isLineChart: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const data = ref([])

    onMounted(async () => {
      if (props.searchUrl) {
        try {
          const response = await getStatistic(props.searchUrl)
          await nextTick()
          data.value = response.data.data
        } catch (error) {
          console.error('Error fetching statistics:', error)
        }
      }
    })

    return {
      title: props.title,
      data
    }
  }
}
</script>

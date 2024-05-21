<template>
  <Chart :size="{ width: 500, height: 420 }" :data="data" :margin="margin">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="dataKeys" :barStyle="{ fill: '#90e0ef' }" />

      <Marker :value="1000" label="Avg." color="#e76f51" strokeWidth="2" strokeDasharray="6 6" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          pl: { color: '#90e0ef' },
          avg: { color: '#0096c7' },
          inc: { color: '#48cae4' }
        }"
      />
    </template>
  </Chart>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart, Grid, Bar, Marker, Tooltip } from 'vue3-charts'

export default defineComponent({
  name: 'BarChart',
  components: { Chart, Grid, Bar, Marker, Tooltip },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataKeys: {
      type: Array,
      default: () => []
    },
    barStyles: {
      type: Array,
      default: () => [{ fill: '#90e0ef' }, { fill: '#0096c7' }, { fill: '#48cae4' }]
    },

    tooltipConfig: {
      type: Object,
      default: () => ({
        borderColor: '#48CAE4',
        dataConfig: {
          pl: { color: '#90e0ef' },
          avg: { color: '#0096c7' },
          inc: { color: '#48cae4' }
        }
      })
    }
  },

  setup(props) {
    const margin = {
      left: 0,
      top: 20,
      right: 20,
      bottom: 0
    }

    return {
      data: props.data,
      dataKeys: props.dataKeys,
      barStyles: props.barStyles,
      margin,
      tooltipConfig: props.tooltipConfig
    }
  }
})
</script>

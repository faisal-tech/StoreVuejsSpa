<template>

  <Chart :size="{ width: 500, height: 400 }" :data="data" :margin="margin" :direction="direction">

    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="dataKeys" />
    </template>

  </Chart>
</template>

<script>
import { ref } from 'vue'
import { Chart, Grid, Line } from 'vue3-charts'

export default {
  name: 'LineChart',
  components: { Chart, Grid, Line },

  props:{
    data:{
      type:Array,
      default:[],
    },
    dataKeys:{
      type:Array,
      default:['name', 'pl'],
    },
  },

  setup(props) {
    const dataKeys = props.dataKeys ;
    const data = //props.data 
    [
      { name: 'Jan', pl: 1000 },
      { name: 'Feb', pl: 2000, },
      { name: 'Apr', pl: 400, },
      { name: 'Mar', pl: 3100, },
      { name: 'May', pl: 200, },
      { name: 'Jun', pl: 600, },
      { name: 'Jul', pl: 500, }
    ];
    const direction = ref('horizontal')
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0
    })

    return { data, direction, margin,dataKeys  }
  }
}

</script>
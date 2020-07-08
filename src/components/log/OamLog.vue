<template>
  <div>
    <log :come="come" :ip="ip" :port="port"></log>
  </div>
</template>

<script>
import Log from './Log'
export default {
  name: 'OamLog',
  components: {Log},
  data () {
    return {
      come: '运维日志',
      ip: 'localhost',
      port: '8086'
    }
  }
}
</script>

<style scoped>

</style>

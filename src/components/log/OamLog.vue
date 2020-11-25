<template>
  <div>
    <log ref="OamLog" :come="come" :urlPath="urlPath"></log>
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
      urlPath: 'log'
    }
  },
  mounted () {
    this.$refs.OamLog.refreshLog()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <log :come="come" :urlPath="urlPath"></log>
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
      urlPath: '/log'
    }
  }
}
</script>

<style scoped>

</style>

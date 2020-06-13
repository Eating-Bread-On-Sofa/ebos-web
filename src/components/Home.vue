<template>
  <div>
    <nav-menu style="position: relative; top:100px;"></nav-menu>
    <router-view style="position:absolute; width: 70%; top:80px; left:25%; border: 1px solid gray; padding-top: 20px; background-color: #f5f6f8"/>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>

</style>

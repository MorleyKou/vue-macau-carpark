<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app :params="f7params">
    <!-- Main View -->
    <f7-view id="main-view" url="/" main :push-state="true"></f7-view>
  </f7-app>
</template>

<script>
import routes from './routes.js'

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      f7params: {
        routes,
        name: 'Carpark Info',
        id: 'com.blupurple.carpark-info',
      }
    }
  },
}
</script>

<style>

</style>
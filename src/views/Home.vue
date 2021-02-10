<template>
  <div id="home" class="pa-4">
    <v-container fluid>
      <h3 class="headline font-weight-medium">Home Page</h3>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    loading: true
  }),
  components: {
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>

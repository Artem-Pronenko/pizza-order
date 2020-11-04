<template>
  <div class="app-main-layout">
    <NavBar @clickMenu="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/app/NavBar'
import Sidebar from '../components/app/Sidebar'

export default {
  name: 'MainLayout',
  components: { Sidebar, NavBar },
  data: () => ({
    isOpen: true
  })
}
</script>

<style scoped></style>

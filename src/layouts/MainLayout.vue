<template>
  <div class="app-main-layout">
    <NavBar @clickMenu="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>
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

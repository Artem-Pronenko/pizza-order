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
      <a @click.prevent="add" class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
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
  }),
  methods: {
    add() {
      const objData = {
        collection: 'stock',
        name: 'пиццаааа',
        imgUrl:
          'https://www.pizzaking.ua/resizer/resize/upload/catalog/e/e7c6ce8e7bffbd7fc86a4c119262da24-472-472-c.jpg',
        info: 'каке-то описани',
        price: 50,
        volume: 1,
        composition: ['Мазик', 'Кепчук', 'Соли']
      }
      this.$store.dispatch('addedPizza', objData).then(() => {
        console.log('added')
      })
    }
  }
}
</script>

<style scoped></style>

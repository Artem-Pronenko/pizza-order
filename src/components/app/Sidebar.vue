<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      :to="link.url"
      tag="li"
      active-class="active"
      v-for="link in links"
      :key="link.url"
      :exact="link.exact"
      :class="{ hide: link.hide }"
      ><a href="#" class="waves-effect pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  props: ['value'],
  computed: {
    ...mapGetters(['UID'])
  },
  async mounted() {
    if (!this.UID) {
      await this.$store.dispatch('getUserId')
    }
    this.admin = this.UID !== 'TzpIYdPOGrVFRwHK0YjJ2t3eVBz1'
    this.links.push({ title: 'Новая запись', url: '/record', hide: this.admin })
  },
  data: () => ({
    admin: false,
    links: [
      { title: 'Главная', url: '/', exact: true },
      { title: 'Все пиццы', url: '/allPizza' },
      { title: 'История заказов', url: '/history' }
    ]
  })
}
</script>

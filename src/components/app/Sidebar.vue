<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      :to="link.url"
      tag="li"
      active-class="active"
      v-for="link in links"
      :key="link.url"
      :exact="link.exact"
      ><a href="#" class="waves-effect waves-orange pointer">{{
        link.title
      }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Главная', url: '/', exact: true },
      { title: 'Все пиццы', url: '/allPizza' },
      { title: 'История заказов', url: '/history' },
      { title: 'Новая запись', url: '/record' }
    ]
  })
}
</script>

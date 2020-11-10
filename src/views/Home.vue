<template>
  <div>
    <div class="page-title">
      <h3>Главная / Акции</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <div class="row">
      <CardPizza
        v-for="(item, i) in getPizza"
        :key="i"
        :name="item.name"
        :info="item.info"
        :price="item.price"
        :imgUrl="item.imgUrl"
        :stockDate="item.stockDate"
        @remove-refresh="refresh"
      />
    </div>
  </div>
</template>

<script>
import CardPizza from './CardPizza'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters(['getPizza']),
  methods: {
    refresh() {
      this.$store.dispatch('getPizzaFB', 'stock')
    }
  },
  components: { CardPizza },
  mounted() {
    this.$store.dispatch('getPizzaFB', 'stock')
  }
}
</script>

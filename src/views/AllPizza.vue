<template>
  <div>
    <div class="page-title">
      <h3>Все пиццы</h3>

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
        :stockDate="item.stockDate || null"
        @remove-refresh="refresh"
      />
    </div>
  </div>
</template>

<script>
import CardPizza from './CardPizza'
import { mapGetters } from 'vuex'

export default {
  name: 'AllPizza',
  computed: mapGetters(['getPizza']),
  components: { CardPizza },
  mounted() {
    this.$store.dispatch('getPizzaFB', 'pizza')
  },
  methods: {
    refresh() {
      this.$store.dispatch('getPizzaFB', 'pizza')
    }
  }
}
</script>

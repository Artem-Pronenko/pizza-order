<template>
  <div class="col s12 m10 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ name }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Цена</th>
              <th>
                <span>{{ price }}</span
                >грн
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Акция до</th>
              <th>
                <span>{{ stockDate }}</span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="card-content card-content__bottom">
        <div class="card-img">
          <img :src="imgUrl" alt="" />
        </div>
        <div class="card-info">
          <p class="card-text">{{ info }}</p>
          <div class="buttons">
            <button class="recipe btn">Заказать</button>
            <button @click="getPizzaComposition" class="recipe btn">
              Состав
            </button>
          </div>
          <ul v-if="composition.length" class="composition">
            <li v-for="(item, i) in composition" :key="i">- {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CardPizza',
  props: {
    name: String,
    info: String,
    price: Number,
    imgUrl: String,
    stockDate: String
  },
  computed: {
    ...mapGetters(['getComposition'])
  },
  data: () => ({
    composition: []
  }),
  methods: {
    async getPizzaComposition() {
      await this.$store
        .dispatch('getPizzaComposition', {
          collection: this.stockDate === 'Истек' ? 'pizza' : 'stock',
          name: this.name
        })
        .then(res => {
          this.composition = res.data().composition
        })
        .then(() => {
          setTimeout(() => {
            this.composition.length = 0
          }, 2000)
        })
    }
  }
}
</script>

<style scoped>
.card-img {
  max-width: 270px;
  min-width: 100px;
}

.composition {
  background: antiquewhite;
  padding: 5px 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.card-content__bottom {
  display: flex;
  justify-content: space-between;
}

.card .card-info {
  margin-left: 10px;
  flex-basis: 50%;
}

.card .card-text {
  margin-bottom: 10px;
}

.bill-card {
  height: auto;
}

img {
  width: 100%;
}
@media (max-width: 992px) {
  .card-content__bottom {
    flex-direction: column;
  }
}
</style>

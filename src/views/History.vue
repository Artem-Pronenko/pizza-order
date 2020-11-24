<template>
  <div>
    <div class="page-title">
      <h3>История Заказов</h3>
      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <section>
      <h5 class="title-history">Ваши заказы</h5>
      <div class="col s12 m10 l8" v-for="(item, i) in cardInfo" :key="i">
        <div class="card-history deep-purple lighten-1 white-text">
          <div class="card-history-img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="card-history-info">
            <span class="card-title">{{ item.orderName }}</span>
            <span class="price"
              >Цена: <span class="small">{{ item.price }}грн</span></span
            >
            <span class="price"
              >Время заказа: <span class="small">{{ item.date }}</span></span
            >
            <span class="price"
              >Заказано на: <span class="small">{{ item.userName }}</span></span
            >
          </div>
        </div>
      </div>
      <h6
        class="deep-purple lighten-2 white-text card-history-warn"
        v-if="!UID"
      >
        Войдите или создайте акаунт
      </h6>
      <h6
        class="deep-purple lighten-2 white-text card-history-warn"
        v-else-if="!cardInfo.length"
      >
        Пока что у вас нет заказов
      </h6>
    </section>
  </div>
</template>

<script>
import message from '@/utils/message'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['UID'])
  },
  data: () => ({
    cardInfo: []
  }),
  async mounted() {
    if (message[this.$route.query.message]) {
      this.$message(message[this.$route.query.message])
    }
    if (this.UID) {
      const cardInfo = await this.$store.dispatch('getPizzaOrder', this.UID)
      this.cardInfo.push(...cardInfo)
    } else {
      await this.$store.dispatch('getUserId')
    }
  },
  methods: {
    async refresh() {
      if (this.UID) {
        this.cardInfo.length = 0
        const cardInfo = await this.$store.dispatch('getPizzaOrder', this.UID)
        this.cardInfo.push(...cardInfo)
      }
    }
  }
}
</script>

<style scoped>
.title-history {
  color: #8c8c8c;
}

.card-history {
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.card-history-warn {
  padding: 5px 10px;
}

.card-history-info {
  display: flex;
  flex-direction: column;
  font-size: 22px;
}

.card-history-img {
  margin-right: 15px;
  max-width: 280px;
}

.card-history-img img {
  width: 100%;
}

.card-history-info .small {
  font-size: 16px;
}
</style>

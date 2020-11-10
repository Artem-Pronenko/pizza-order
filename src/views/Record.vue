<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="onsubmit">
      <div class="input-field">
        <input
          id="amount"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: validateName()
          }"
        />
        <label for="amount">Название пиццы</label>
        <span class="helper-text invalid" v-if="validateName()"
          >Невалидное значение</span
        >
      </div>
      <div class="input-field">
        <input
          id="price"
          type="number"
          v-model.trim="price"
          :class="{
            invalid: validatePrice()
          }"
        />
        <label for="price">Цена</label>
        <span class="helper-text invalid" v-if="validatePrice()"
          >Невалидное значение</span
        >
      </div>
      <div class="input-field">
        <input
          id="info"
          type="text"
          v-model.trim="info"
          :class="{
            invalid: validateInfo()
          }"
        />
        <label for="info">Информация</label>
        <span class="helper-text invalid" v-if="validateInfo()"
          >Невалидное значение</span
        >
      </div>

      <div class="input-field">
        <input
          id="imgUrl"
          type="text"
          v-model.trim="imgUrl"
          :class="{
            invalid: validateInfo()
          }"
        />
        <label for="imgUrl">Ссылка на изображение</label>
        <span class="helper-text invalid" v-if="validateImgUrl()"
          >Невалидное значение. Формат https://...</span
        >
      </div>

      <div class="input-field">
        <input
          id="volume"
          type="number"
          v-model.trim="volume"
          :class="{
            invalid: validateVolume()
          }"
        />
        <label for="volume">Количество</label>
        <span class="helper-text invalid" v-if="validateVolume()"
          >Невалидное значение</span
        >
      </div>

      <div class="input-field">
        <input
          id="composition"
          type="text"
          v-model.trim="composition"
          :class="{
            invalid: validateComposition()
          }"
        />
        <label for="composition">Состав через запятую</label>
        <span class="helper-text invalid" v-if="validateVolume()"
          >Невалидное значение</span
        >
      </div>

      <p>
        <label>
          <input
            v-model="collection"
            class="with-gap"
            name="type"
            type="checkbox"
            value="income"
          />
          <span>Акционная</span>
        </label>
        <br />
        <label v-if="collection">
          Акция до:
          <input v-model="dateStock" type="date" />
        </label>
      </p>

      <button class="btn waves-effect waves-light" type="submit">
        Добавить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  maxValue
} from 'vuelidate/lib/validators'
import message from '@/utils/message'

export default {
  name: 'Record',
  data: () => ({
    name: '',
    info: '',
    price: '',
    collection: '',
    imgUrl: '',
    volume: '',
    composition: '',
    dateStock: ''
  }),
  validations: {
    name: { required, minLength: minLength(6), maxLength: maxLength(30) },
    info: { required, minLength: minLength(20), maxLength: maxLength(260) },
    price: { required, minLength: minLength(1), maxValue: maxValue(500) },
    imgUrl: { required, minLength: minLength(10), maxLength: maxLength(200) },
    volume: { required, minLength: minLength(1), maxValue: maxValue(50) },
    composition: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(100)
    }
  },
  methods: {
    validateName() {
      return (
        (this.$v.name.$dirty && !this.$v.name.required) ||
        !this.$v.name.minLength ||
        !this.$v.name.maxLength
      )
    },
    validateInfo() {
      return (
        (this.$v.info.$dirty && !this.$v.info.required) ||
        !this.$v.info.minLength ||
        !this.$v.info.maxLength
      )
    },
    validatePrice() {
      return (
        (this.$v.price.$dirty && !this.$v.price.required) ||
        !this.$v.price.minLength ||
        !this.$v.price.maxValue
      )
    },
    validateImgUrl() {
      return (
        (this.$v.imgUrl.$dirty && !this.$v.imgUrl.required) ||
        !this.$v.imgUrl.minLength ||
        !this.$v.imgUrl.maxLength
      )
    },
    validateVolume() {
      return (
        (this.$v.volume.$dirty && !this.$v.volume.required) ||
        !this.$v.volume.minLength ||
        !this.$v.volume.maxValue
      )
    },
    validateComposition() {
      return (
        (this.$v.composition.$dirty && !this.$v.composition.required) ||
        !this.$v.composition.minLength ||
        !this.$v.composition.maxLength
      )
    },
    onsubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const compositionArr = []
      this.composition.split(',').forEach(i => {
        i = i.trim()
        i !== '' && compositionArr.push(i)
      })
      const dataObj = {
        name: this.name,
        info: this.info,
        price: +this.price,
        collection: this.collection ? 'stock' : 'pizza',
        imgUrl: this.imgUrl,
        composition: compositionArr,
        volume: +this.volume,
        stockDate: this.dateStock
      }
      this.$store.dispatch('addedPizza', dataObj).then(() => {
        this.name = ''
        this.info = ''
        this.price = ''
        this.collection = ''
        this.imgUrl = ''
        this.volume = ''
        this.composition = ''
        this.$message(message['addedNewPizza'])
      })
    }
  }
}
</script>

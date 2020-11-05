<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="changeName">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid:
              (this.$v.name.$dirty && !this.$v.name.required) ||
              !this.$v.name.minLength
          }"
        />
        <label for="description">Имя</label>
        <span
          class="helper-text invalid"
          v-if="
            (this.$v.name.$dirty && !this.$v.name.required) ||
              !this.$v.name.minLength
          "
          >Невалидное значение</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import message from '@/utils/message';

export default {
  data: () => ({
    name: ''
  }),
  validations: {
    name: { required, minLength: minLength(2) }
  },
  methods: {
    changeName() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$store.dispatch('nameDB', this.name)
      this.$message(message['rename'])
    }
  }
}
</script>

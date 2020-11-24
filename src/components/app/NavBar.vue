<template>
  <nav class="navbar deep-purple lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clickMenu')">
          <i class="material-icons">dehaze</i>
        </a>
        <span>{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ getName ? getName : 'Вход' }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li v-if="accountConnect">
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logOut">
                <i class="material-icons">assignment_return</i
                >{{ accountConnect ? 'Выйти' : 'Войти' }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  computed: {
    ...mapGetters(['getName']),
    accountConnect() {
      return this.getName
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
      await this.$router.push('/login?message=logOut')
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constraintWidth: true
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

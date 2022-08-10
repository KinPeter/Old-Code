<template>
  <div class="login">
    <v-card :loading="loading" class="login__card">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-card-title>
          Login
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="textRules"
            label="Username"
            type="text"
            autocomplete="name"
            required
            dense
            filled
          />
          <v-text-field
            v-model="password"
            :rules="textRules"
            label="Password"
            type="password"
            autocomplete="password"
            required
            dense
            filled
          />
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!valid" color="secondary" outlined type="submit">
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card v-if="error" color="error" class="login__card login__card_error">
      <v-card-text>
        <p>
          <v-icon>mdi-alert-circle</v-icon>
          Invalid credentials. Please try again.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, SetupContext } from '@vue/composition-api'

export default defineComponent({
  auth: false,
  setup(_props, ctx: SetupContext) {
    const loading: Ref<boolean> = ref(false)
    const valid: Ref<boolean> = ref(false)
    const error: Ref<boolean> = ref(false)
    const textRules = [
      (v: string) => (!!v && v.length > 3) || 'That should be a bit longer...',
    ]
    const username: Ref<string> = ref('')
    const password: Ref<string> = ref('')

    const onSubmit = async () => {
      loading.value = true
      error.value = false
      try {
        await ctx.root.$auth.loginWith('custom', username.value, password.value)
        ctx.root.$router.push('/decks')
      } catch (e) {
        if (e.response.status === 401) {
          error.value = true
        } else {
          ctx.root.$nuxt.error(e)
        }
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      valid,
      error,
      textRules,
      username,
      password,
      onSubmit,
    }
  },
  head: {
    title: 'Login',
  },
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login__card {
  width: 100%;
  max-width: 400px;
}

.login__card_error {
  margin-top: 16px;
  text-align: center;
}

.v-card__text {
  padding-bottom: 0;
}

.v-card__actions {
  padding: 8px 16px 16px 16px;
}

.v-btn {
  width: 100%;
}
</style>

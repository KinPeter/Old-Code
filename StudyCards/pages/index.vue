<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,

  fetch({ redirect, $auth }) {
    if ($auth.loggedIn) {
      redirect('/decks')
    } else {
      redirect('/login')
    }
  },
})
</script>

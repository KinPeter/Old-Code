<template>
  <v-card class="progress-card-wrapper">
    <v-card-text class="progress-card">
      <div class="progress-card__inner progress-card__inner_done">
        {{ $accessor.decks.loadedDeck.progress.done.length }}
      </div>
      <div class="progress-card__inner progress-card__inner_difficult">
        {{ $accessor.decks.loadedDeck.progress.difficult.length }}
      </div>
      <div class="progress-card__inner progress-card__inner_remaining">
        {{ $accessor.decks.loadedDeck.progress.remaining.length }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.progress-card-wrapper {
  max-height: 30px;
  margin: 4px 0 0;
}

.progress-card {
  display: flex;
  padding: 0;
  overflow: hidden;
}

.progress-card__inner {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;

  &_done {
    background-color: var(--v-success-base);
  }

  &_difficult {
    background-color: var(--v-error-base);
  }

  &_remaining {
    background-color: var(--v-warning-base);
  }
}

@media (min-width: 700px) {
  .progress-card-wrapper {
    margin: 4px 4px 0;
  }
}
</style>

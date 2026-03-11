<script setup lang="ts">
const cart = useCartStore()

useSeoMeta({
  title: 'Корзина | ONE_STYLE FOREVER',
  description: 'Корзина покупок'
})
</script>

<template>
  <div>
    <AppHeader />

    <main class="section">
      <div class="container">
        <h1 style="margin-top: 0;">Корзина</h1>

        <div v-if="!cart.items.length" class="card" style="padding: 20px;">
          Корзина пуста
        </div>

        <div v-else style="display: grid; gap: 16px;">
          <article
            v-for="item in cart.items"
            :key="item.product.id"
            class="card"
            style="padding: 16px; display: grid; grid-template-columns: 120px 1fr auto; gap: 16px; align-items: center;"
          >
            <img
              :src="item.product.images[0]?.url"
              :alt="item.product.title"
              style="width: 120px; height: 120px; object-fit: cover; border-radius: 12px;"
            />

            <div style="display: grid; gap: 8px;">
              <strong>{{ item.product.title }}</strong>
              <span class="muted">{{ item.product.price.current }} {{ item.product.price.currency }}</span>

              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="btn btn-secondary" @click="cart.decrement(item.product.id)">-</button>
                <span>{{ item.quantity }}</span>
                <button class="btn btn-secondary" @click="cart.increment(item.product.id)">+</button>
              </div>
            </div>

            <div style="display: grid; gap: 8px; justify-items: end;">
              <strong>{{ item.product.price.current * item.quantity }} {{ item.product.price.currency }}</strong>
              <button class="btn btn-secondary" @click="cart.remove(item.product.id)">Удалить</button>
            </div>
          </article>

          <section class="card" style="padding: 20px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;">
            <strong style="font-size: 22px;">
              Итого: {{ cart.totalPrice }} MDL
            </strong>

            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-secondary" @click="cart.clear()">Очистить</button>
              <button class="btn btn-primary">Оформить заказ</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

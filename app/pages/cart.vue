<script setup lang="ts">
const { t, getLocalizedTitle, getLocalizedDescription, brandInfo } = useStoreProducts()
const { items, count, total, increment, decrement, remove, clear, hydrated } = useCart()

const customerName = ref('')
const customerPhone = ref('')
const customerComment = ref('')

const orderText = computed(() => {
  const lines: string[] = []

  lines.push(`${t.value.brand}`)
  lines.push('')
  lines.push(`${t.value.checkoutName}: ${customerName.value || '-'}`)
  lines.push(`${t.value.checkoutPhone}: ${customerPhone.value || '-'}`)
  lines.push(`${t.value.checkoutComment}: ${customerComment.value || '-'}`)
  lines.push('')
  lines.push(`${t.value.cart}:`)

  items.value.forEach((item, index) => {
    lines.push(`${index + 1}. ${getLocalizedTitle(item)} — ${item.qty} x ${item.price} MDL = ${item.qty * item.price} MDL`)
  })

  lines.push('')
  lines.push(`${t.value.total}: ${total.value} MDL`)

  return lines.join('\n')
})

const telegramLink = computed(() => {
  return `${brandInfo.telegramUrl}?text=${encodeURIComponent(orderText.value)}`
})

const emailLink = computed(() => {
  return `mailto:${brandInfo.email}?subject=${encodeURIComponent(`${t.value.checkout} - ${t.value.brand}`)}&body=${encodeURIComponent(orderText.value)}`
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="catalog-top">
        <div>
          <h1 class="page-title">{{ t.cart }}</h1>
          <p class="page-subtitle">{{ t.total }}: {{ total }} MDL</p>
        </div>

        <button v-if="count > 0" type="button" class="btn btn-secondary" @click="clear">
          {{ t.clear }}
        </button>
      </div>

      <div v-if="!hydrated" class="card" style="padding:28px;text-align:center;color:#64748b;">
        Loading...
      </div>

      <div v-else-if="count === 0" class="card" style="padding:28px;text-align:center;color:#64748b;">
        {{ t.emptyCart }}
      </div>

      <div v-else class="cart-layout">
        <section class="card cart-card">
          <div v-for="item in items" :key="item.id" class="cart-row">
            <div class="cart-thumb">
              <img :src="item.images[0]" :alt="getLocalizedTitle(item)" />
            </div>

            <div>
              <div class="cart-content-top">
                <div>
                  <h3 class="cart-item-title">{{ getLocalizedTitle(item) }}</h3>
                  <p class="cart-item-desc">{{ getLocalizedDescription(item) }}</p>
                </div>

                <button type="button" class="cart-remove" @click="remove(item.id)">×</button>
              </div>

              <div class="cart-content-bottom">
                <div class="qty">
                  <button type="button" @click="decrement(item.id)">-</button>
                  <span>{{ item.qty }}</span>
                  <button type="button" @click="increment(item.id)">+</button>
                </div>

                <strong>{{ item.price * item.qty }} MDL</strong>
              </div>
            </div>
          </div>
        </section>

        <aside class="card checkout-card">
          <h2 style="margin:0;font-size:28px;font-weight:900;">{{ t.checkoutTitle }}</h2>

          <label class="checkout-field">
            <span>{{ t.checkoutName }}</span>
            <input v-model="customerName" type="text" :placeholder="t.checkoutNamePlaceholder" />
          </label>

          <label class="checkout-field">
            <span>{{ t.checkoutPhone }}</span>
            <input v-model="customerPhone" type="text" :placeholder="t.checkoutPhonePlaceholder" />
          </label>

          <label class="checkout-field">
            <span>{{ t.checkoutComment }}</span>
            <textarea v-model="customerComment" rows="4" :placeholder="t.checkoutCommentPlaceholder" />
          </label>

          <div style="display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #e5e7eb;padding-bottom:12px;">
            <span>{{ t.total }}</span>
            <strong>{{ total }} MDL</strong>
          </div>

          <a :href="telegramLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            {{ t.checkoutTelegram }}
          </a>

          <a :href="emailLink" class="btn btn-secondary">
            {{ t.checkoutEmail }}
          </a>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const { t, getLocalizedTitle, getLocalizedDescription, brandInfo } = useStoreProducts()
const { items, count, total, increment, decrement, remove, changeSize, clear, hydrated } = useCart()

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
    lines.push(
      `${index + 1}. ${getLocalizedTitle(item)} — ${t.value.chooseSizeShort}: ${item.selectedSize} — ${item.qty} x ${item.price} MDL = ${item.qty * item.price} MDL`
    )
  })

  lines.push('')
  lines.push(`${t.value.total}: ${total.value} MDL`)

  return lines.join('\n')
})

const telegramLink = computed(() => `${brandInfo.telegramUrl}?text=${encodeURIComponent(orderText.value)}`)
const emailLink = computed(() => `mailto:${brandInfo.email}?subject=${encodeURIComponent(`${t.value.checkout} - ${t.value.brand}`)}&body=${encodeURIComponent(orderText.value)}`)
</script>

<template>
  <main class="cart-ref">
    <div class="container">
      <div class="cart-ref__top">
        <div>
          <h1 class="cart-ref__title">{{ t.cart }}</h1>
          <p class="cart-ref__subtitle">{{ t.total }}: {{ total }} MDL</p>
        </div>

        <button v-if="count > 0" type="button" class="cart-ref__clear" @click="clear">
          {{ t.clear }}
        </button>
      </div>

      <div v-if="!hydrated" class="cart-ref__empty">Loading...</div>
      <div v-else-if="count === 0" class="cart-ref__empty">{{ t.emptyCart }}</div>

      <div v-else class="cart-ref__layout">
        <section class="cart-ref__list">
          <article
            v-for="item in items"
            :key="`${item.id}-${item.selectedSize}`"
            class="cart-ref__item"
          >
            <div class="cart-ref__image">
              <img :src="item.images[0]" :alt="getLocalizedTitle(item)" />
            </div>

            <div class="cart-ref__body">
              <div class="cart-ref__head">
                <div class="cart-ref__main">
                  <h3 class="cart-ref__item-title">{{ getLocalizedTitle(item) }}</h3>
                  <p class="cart-ref__item-desc">{{ getLocalizedDescription(item) }}</p>
                </div>

                <button type="button" class="cart-ref__remove" @click="remove(item.id, item.selectedSize)">
                  ×
                </button>
              </div>

              <div class="cart-ref__bottom">
                <div class="cart-ref__controls">
                  <label class="cart-ref__size">
                    <span>{{ t.chooseSizeShort }}</span>
                    <select
                      :value="item.selectedSize"
                      @change="changeSize(item.id, item.selectedSize, String(($event.target as HTMLSelectElement).value))"
                    >
                      <option v-for="size in item.sizes" :key="size" :value="size">
                        {{ size }}
                      </option>
                    </select>
                  </label>

                  <div class="cart-ref__qty">
                    <button type="button" @click="decrement(item.id, item.selectedSize)">-</button>
                    <span>{{ item.qty }}</span>
                    <button type="button" @click="increment(item.id, item.selectedSize)">+</button>
                  </div>
                </div>

                <div class="cart-ref__price">
                  <strong>{{ item.price * item.qty }} MDL</strong>
                </div>
              </div>
            </div>
          </article>
        </section>

        <aside class="cart-ref__aside">
          <div class="cart-ref__checkout">
            <h2 class="cart-ref__checkout-title">{{ t.checkoutTitle }}</h2>

            <label class="cart-ref__field">
              <span>{{ t.checkoutName }}</span>
              <input v-model="customerName" type="text" :placeholder="t.checkoutNamePlaceholder" />
            </label>

            <label class="cart-ref__field">
              <span>{{ t.checkoutPhone }}</span>
              <input v-model="customerPhone" type="text" :placeholder="t.checkoutPhonePlaceholder" />
            </label>

            <label class="cart-ref__field">
              <span>{{ t.checkoutComment }}</span>
              <textarea v-model="customerComment" rows="4" :placeholder="t.checkoutCommentPlaceholder" />
            </label>

            <div class="cart-ref__summary">
              <div class="cart-ref__summary-row">
                <span>{{ t.total }}</span>
                <strong>{{ total }} MDL</strong>
              </div>
            </div>

            <a :href="telegramLink" target="_blank" rel="noopener noreferrer" class="cart-ref__btn cart-ref__btn--primary">
              {{ t.checkoutTelegram }}
            </a>

            <a :href="emailLink" class="cart-ref__btn cart-ref__btn--secondary">
              {{ t.checkoutEmail }}
            </a>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cart-ref{
  padding:28px 0 40px;
}

.cart-ref__top{
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:16px;
  flex-wrap:wrap;
  margin-bottom:20px;
}

.cart-ref__title{
  margin:0;
  font-size:56px;
  line-height:1;
  font-weight:900;
  letter-spacing:-1.4px;
  color:#0f172a;
}

.cart-ref__subtitle{
  margin:8px 0 0;
  color:#64748b;
  font-size:18px;
}

.cart-ref__clear{
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
  border-radius:16px;
  padding:12px 18px;
  font-weight:800;
  cursor:pointer;
}

.cart-ref__empty{
  border:1px solid #e5e7eb;
  background:#fff;
  border-radius:24px;
  padding:28px;
  text-align:center;
  color:#64748b;
}

.cart-ref__layout{
  display:grid;
  grid-template-columns:minmax(0,1fr) 300px;
  gap:20px;
  align-items:start;
}

.cart-ref__list{
  display:grid;
  gap:14px;
}

.cart-ref__item{
  display:grid;
  grid-template-columns:98px 1fr;
  gap:16px;
  background:#fff;
  border:1px solid #e8ece9;
  border-radius:28px;
  padding:18px;
  box-shadow:0 8px 18px rgba(15,23,42,.04);
}

.cart-ref__image{
  width:98px;
  height:98px;
  border-radius:18px;
  background:#f3f7f4;
  border:1px solid #dfe7e1;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  padding:10px;
}

.cart-ref__image img{
  width:100%;
  height:100%;
  object-fit:contain;
}

.cart-ref__body{
  min-width:0;
  display:grid;
  gap:14px;
}

.cart-ref__head{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
}

.cart-ref__main{
  min-width:0;
}

.cart-ref__item-title{
  margin:0 0 8px;
  font-size:20px;
  line-height:1.15;
  font-weight:900;
  color:#0f172a;
}

.cart-ref__item-desc{
  margin:0;
  color:#64748b;
  font-size:14px;
  line-height:1.6;
  max-width:560px;
}

.cart-ref__remove{
  border:none;
  background:transparent;
  color:#94a3b8;
  font-size:28px;
  line-height:1;
  cursor:pointer;
  flex:0 0 auto;
}

.cart-ref__bottom{
  display:flex;
  justify-content:space-between;
  gap:16px;
  align-items:flex-end;
  flex-wrap:wrap;
}

.cart-ref__controls{
  display:flex;
  align-items:flex-end;
  gap:12px;
  flex-wrap:wrap;
}

.cart-ref__size{
  display:grid;
  gap:6px;
}

.cart-ref__size span{
  font-size:12px;
  color:#64748b;
  font-weight:800;
}

.cart-ref__size select{
  min-width:84px;
  height:38px;
  border-radius:12px;
  border:1px solid #dce6df;
  background:#fff;
  padding:0 10px;
  font-weight:800;
  color:#0f172a;
  outline:none;
}

.cart-ref__qty{
  display:inline-flex;
  align-items:center;
  gap:10px;
  background:#fff;
  border:1px solid #dbe4de;
  border-radius:14px;
  padding:6px 8px;
}

.cart-ref__qty button{
  width:30px;
  height:30px;
  border:none;
  border-radius:9px;
  background:#f1f5f9;
  cursor:pointer;
  font-weight:900;
}

.cart-ref__qty span{
  min-width:18px;
  text-align:center;
  font-weight:900;
}

.cart-ref__price strong{
  font-size:18px;
  font-weight:900;
  color:#0f172a;
}

.cart-ref__aside{
  position:sticky;
  top:104px;
}

.cart-ref__checkout{
  background:#fff;
  border:1px solid #e8ece9;
  border-radius:28px;
  box-shadow:0 8px 18px rgba(15,23,42,.04);
  padding:18px;
  display:grid;
  gap:12px;
}

.cart-ref__checkout-title{
  margin:0 0 4px;
  font-size:22px;
  line-height:1.15;
  font-weight:900;
  color:#0f172a;
}

.cart-ref__field{
  display:grid;
  gap:6px;
}

.cart-ref__field span{
  font-size:13px;
  font-weight:800;
  color:#475569;
}

.cart-ref__field input,
.cart-ref__field textarea{
  width:100%;
  border:1px solid #e5e7eb;
  border-radius:14px;
  background:#fff;
  padding:12px 14px;
  font-size:14px;
  outline:none;
  resize:vertical;
}

.cart-ref__summary{
  padding:14px;
  border-radius:16px;
  background:#f7faf8;
  border:1px solid #e4ece7;
}

.cart-ref__summary-row{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:center;
}

.cart-ref__summary-row strong{
  font-size:20px;
  font-weight:900;
  color:#0f172a;
}

.cart-ref__btn{
  min-height:46px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  font-weight:900;
  font-size:14px;
}

.cart-ref__btn--primary{
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
  box-shadow:0 12px 24px rgba(47,125,87,.16);
}

.cart-ref__btn--secondary{
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
}

@media (max-width: 1180px){
  .cart-ref__layout{
    grid-template-columns:1fr;
  }

  .cart-ref__aside{
    position:static;
  }
}

@media (max-width: 760px){
  .cart-ref__title{
    font-size:38px;
  }

  .cart-ref__item{
    grid-template-columns:1fr;
  }

  .cart-ref__image{
    width:100%;
    height:220px;
  }
}
</style>

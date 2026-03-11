<script setup lang="ts">
const { t, getLocalizedProduct } = useStoreProducts()
const { items, total, count, increment, decrement, remove, clear } = useCart()
const { isOpen, close } = useCartDrawer()

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}
</script>

<template>
  <Teleport to="body">
    <transition name="cart-fade">
      <div
        v-if="isOpen"
        class="drawer-backdrop"
        @click="onBackdropClick"
      >
        <transition name="cart-slide">
          <aside v-if="isOpen" class="drawer-panel">
            <div class="drawer-top">
              <div>
                <div class="drawer-title">{{ t.cart }}</div>
                <div class="drawer-sub">{{ count }}</div>
              </div>

              <button type="button" class="drawer-close" @click="close">
                ×
              </button>
            </div>

            <div v-if="!items.length" class="drawer-empty">
              {{ t.emptyCart }}
            </div>

            <div v-else class="drawer-items">
              <div
                v-for="item in items"
                :key="item.id"
                class="drawer-item"
              >
                <div class="drawer-thumb">
                  <img :src="item.image" :alt="getLocalizedProduct(item).title" />
                </div>

                <div class="drawer-content">
                  <div class="drawer-item-head">
                    <div>
                      <div class="drawer-item-title">{{ getLocalizedProduct(item).title }}</div>
                      <div class="drawer-item-price">{{ item.price }} MDL</div>
                    </div>

                    <button
                      type="button"
                      class="drawer-remove"
                      @click="remove(item.id)"
                    >
                      ×
                    </button>
                  </div>

                  <div class="drawer-item-bottom">
                    <div class="drawer-qty">
                      <button type="button" @click="decrement(item.id)">-</button>
                      <span>{{ item.qty }}</span>
                      <button type="button" @click="increment(item.id)">+</button>
                    </div>

                    <strong class="drawer-sum">{{ item.price * item.qty }} MDL</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="drawer-footer">
              <div class="drawer-total-row">
                <span>{{ t.total }}</span>
                <strong>{{ total }} MDL</strong>
              </div>

              <div class="drawer-actions">
                <button
                  v-if="count > 0"
                  type="button"
                  class="btn btn-secondary"
                  @click="clear"
                >
                  {{ t.clear }}
                </button>

                <NuxtLink to="/cart" class="btn btn-primary" @click="close">
                  {{ t.cart }}
                </NuxtLink>
              </div>
            </div>
          </aside>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.drawer-backdrop{
  position:fixed;
  inset:0;
  background:rgba(15,23,42,.42);
  backdrop-filter:blur(4px);
  z-index:200;
  display:flex;
  justify-content:flex-end;
}

.drawer-panel{
  width:min(420px,100%);
  height:100dvh;
  background:rgba(255,255,255,.98);
  border-left:1px solid #e5e7eb;
  box-shadow:-18px 0 40px rgba(15,23,42,.10);
  display:grid;
  grid-template-rows:auto 1fr auto;
}

.drawer-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  padding:20px 20px 16px;
  border-bottom:1px solid #e5e7eb;
}

.drawer-title{
  font-size:28px;
  font-weight:900;
}

.drawer-sub{
  font-size:14px;
  color:#64748b;
}

.drawer-close{
  border:none;
  background:transparent;
  color:#64748b;
  font-size:32px;
  line-height:1;
  cursor:pointer;
}

.drawer-empty{
  padding:24px;
  color:#64748b;
  text-align:center;
  display:flex;
  align-items:center;
  justify-content:center;
}

.drawer-items{
  overflow:auto;
  padding:16px 20px;
  display:grid;
  gap:12px;
}

.drawer-item{
  background:#f8fafc;
  border:1px solid #e5e7eb;
  border-radius:22px;
  padding:14px;
  display:grid;
  grid-template-columns:82px 1fr;
  gap:14px;
}

.drawer-thumb{
  width:82px;
  height:82px;
  border-radius:16px;
  overflow:hidden;
  background:#fff;
  border:1px solid #e5e7eb;
}

.drawer-thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.drawer-content{
  min-width:0;
}

.drawer-item-head{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
  margin-bottom:8px;
}

.drawer-item-title{
  font-size:16px;
  font-weight:900;
  margin-bottom:4px;
}

.drawer-item-price{
  font-size:13px;
  color:#64748b;
}

.drawer-remove{
  border:none;
  background:transparent;
  color:#94a3b8;
  font-size:20px;
  cursor:pointer;
}

.drawer-item-bottom{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.drawer-qty{
  display:inline-flex;
  align-items:center;
  gap:10px;
  background:#fff;
  border:1px solid #e5e7eb;
  border-radius:14px;
  padding:6px 8px;
}

.drawer-qty button{
  width:30px;
  height:30px;
  border:none;
  border-radius:10px;
  background:#f1f5f9;
  cursor:pointer;
  font-weight:900;
}

.drawer-qty span{
  min-width:20px;
  text-align:center;
  font-weight:900;
}

.drawer-sum{
  font-size:17px;
}

.drawer-footer{
  border-top:1px solid #e5e7eb;
  padding:16px 20px 20px;
  display:grid;
  gap:14px;
  background:#fff;
}

.drawer-total-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.drawer-total-row span{
  color:#64748b;
}

.drawer-total-row strong{
  font-size:28px;
}

.drawer-actions{
  display:grid;
  gap:10px;
}

.cart-fade-enter-active,
.cart-fade-leave-active{
  transition:opacity .2s ease;
}
.cart-fade-enter-from,
.cart-fade-leave-to{
  opacity:0;
}

.cart-slide-enter-active,
.cart-slide-leave-active{
  transition:transform .24s ease;
}
.cart-slide-enter-from,
.cart-slide-leave-to{
  transform:translateX(100%);
}

@media (max-width: 640px){
  .drawer-backdrop{
    align-items:flex-end;
    justify-content:stretch;
  }

  .drawer-panel{
    width:100%;
    height:min(88dvh, 760px);
    border-left:none;
    border-top:1px solid #e5e7eb;
    border-top-left-radius:22px;
    border-top-right-radius:22px;
    box-shadow:0 -18px 40px rgba(15,23,42,.10);
  }

  .drawer-item{
    grid-template-columns:64px 1fr;
  }

  .drawer-thumb{
    width:64px;
    height:64px;
  }

  .drawer-title{
    font-size:24px;
  }

  .cart-slide-enter-from,
  .cart-slide-leave-to{
    transform:translateY(100%);
  }
}
</style>

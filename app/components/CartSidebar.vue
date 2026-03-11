<script setup lang="ts">
const { t, getLocalizedProduct } = useStoreProducts()
const { items, total, count, increment, decrement, remove, clear, hydrated } = useCart()
</script>

<template>
  <aside class="sidebar">
    <div class="top">
      <div>
        <div class="title">{{ t.cart }}</div>
        <div class="sub">{{ count }}</div>
      </div>

      <button
        v-if="hydrated && items.length"
        type="button"
        class="clear-btn"
        @click="clear"
      >
        {{ t.clear }}
      </button>
    </div>

    <div v-if="!hydrated" class="state-box">
      Loading...
    </div>

    <div v-else-if="!items.length" class="state-box">
      {{ t.emptyCart }}
    </div>

    <div v-else class="items-list">
      <div v-for="item in items" :key="item.id" class="cart-item">
        <div class="thumb">
          <img :src="item.image" :alt="getLocalizedProduct(item).title" />
        </div>

        <div class="content">
          <div class="item-head">
            <div class="item-main">
              <div class="item-title">{{ getLocalizedProduct(item).title }}</div>
              <div class="item-price">{{ item.price }} MDL</div>
            </div>

            <button type="button" class="remove-btn" @click="remove(item.id)">
              ×
            </button>
          </div>

          <div class="item-bottom">
            <div class="qty">
              <button type="button" @click="decrement(item.id)">-</button>
              <span>{{ item.qty }}</span>
              <button type="button" @click="increment(item.id)">+</button>
            </div>

            <strong class="sum">{{ item.price * item.qty }} MDL</strong>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hydrated && items.length" class="footer">
      <div class="total-row">
        <span>{{ t.total }}</span>
        <strong>{{ total }} MDL</strong>
      </div>

      <NuxtLink to="/cart" class="checkout-btn">
        {{ t.checkout }}
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.sidebar{
  position:sticky;
  top:108px;
  background:rgba(255,255,255,.86);
  border:1px solid #e5e7eb;
  border-radius:30px;
  padding:20px;
  box-shadow:0 20px 42px rgba(15,23,42,.06);
  display:grid;
  gap:16px;
}

.top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.title{
  font-size:28px;
  font-weight:900;
}

.sub{
  font-size:14px;
  color:#64748b;
}

.clear-btn{
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
  border-radius:14px;
  padding:10px 12px;
  font-weight:800;
  cursor:pointer;
}

.state-box{
  min-height:180px;
  border-radius:24px;
  border:1px dashed #dbe3eb;
  background:#f8fafc;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  color:#64748b;
  line-height:1.7;
  padding:22px;
}

.items-list{
  display:grid;
  gap:12px;
  max-height:420px;
  overflow:auto;
  padding-right:4px;
}

.cart-item{
  background:#f8fafc;
  border:1px solid #e5e7eb;
  border-radius:22px;
  padding:14px;
  display:grid;
  grid-template-columns:82px minmax(0,1fr);
  gap:14px;
}

.thumb{
  width:82px;
  height:82px;
  border-radius:16px;
  overflow:hidden;
  background:#fff;
  border:1px solid #e5e7eb;
}

.thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.content{
  min-width:0;
  display:grid;
  gap:10px;
}

.item-head{
  display:flex;
  justify-content:space-between;
  gap:12px;
  align-items:flex-start;
}

.item-main{
  min-width:0;
}

.item-title{
  font-size:16px;
  font-weight:900;
  margin-bottom:4px;
  word-break:break-word;
}

.item-price{
  font-size:13px;
  color:#64748b;
}

.remove-btn{
  border:none;
  background:transparent;
  color:#94a3b8;
  font-size:20px;
  cursor:pointer;
  line-height:1;
  flex:0 0 auto;
}

.item-bottom{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.qty{
  display:inline-flex;
  align-items:center;
  gap:10px;
  background:#fff;
  border:1px solid #e5e7eb;
  border-radius:14px;
  padding:6px 8px;
}

.qty button{
  width:30px;
  height:30px;
  border:none;
  border-radius:10px;
  background:#f1f5f9;
  cursor:pointer;
  font-weight:900;
}

.qty span{
  min-width:20px;
  text-align:center;
  font-weight:900;
}

.sum{
  font-size:17px;
}

.footer{
  border-top:1px solid #e5e7eb;
  padding-top:16px;
  display:grid;
  gap:12px;
}

.total-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.total-row span{
  font-size:16px;
  color:#64748b;
}

.total-row strong{
  font-size:32px;
}

.checkout-btn{
  width:100%;
  text-align:center;
  text-decoration:none;
  border:none;
  border-radius:18px;
  padding:16px 18px;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
  font-size:16px;
  font-weight:900;
  box-shadow:0 14px 28px rgba(47,125,87,.22);
}

@media (max-width: 1180px){
  .sidebar{
    position:static;
  }
}

@media (max-width: 640px){
  .sidebar{
    padding:16px;
    border-radius:24px;
  }

  .title{
    font-size:24px;
  }

  .cart-item{
    grid-template-columns:64px minmax(0,1fr);
    padding:12px;
  }

  .thumb{
    width:64px;
    height:64px;
  }

  .item-title{
    font-size:14px;
  }

  .sum{
    font-size:15px;
  }

  .total-row strong{
    font-size:26px;
  }

  .checkout-btn{
    padding:14px 16px;
  }
}
</style>
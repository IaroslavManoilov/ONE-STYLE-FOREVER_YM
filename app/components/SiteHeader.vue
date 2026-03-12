<script setup lang="ts">
const { locale, setLocale, t } = useStoreProducts()
const { count: cartCount } = useCart()
const { count: wishlistCount } = useWishlist()

const wishlistLabel = computed(() => {
  if (locale.value === 'ru') return 'Избранное'
  if (locale.value === 'ro') return 'Favorite'
  return 'Wishlist'
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__wrap">
      <NuxtLink to="/" class="brand">
        <span class="brand__mark">
          <img src="/images/brand/logo-cs.png" alt="CS" />
        </span>

        <span>
          <span class="brand__title">ONE_STYLE</span>
          <span class="brand__sub">FOREVER</span>
        </span>
      </NuxtLink>

      <nav class="site-nav">
        <NuxtLink to="/" class="site-nav__link">{{ t.navHome }}</NuxtLink>
        <NuxtLink to="/catalog" class="site-nav__link">{{ t.navCatalog }}</NuxtLink>
        <NuxtLink to="/about" class="site-nav__link">{{ t.navAbout }}</NuxtLink>

        <div class="wishlist-menu">
          <NuxtLink to="/wishlist" class="site-nav__link wishlist-link wishlist-link--icon">
            <span class="wishlist-link__icon">♡</span>
            <span class="wishlist-link__count">{{ wishlistCount }}</span>
          </NuxtLink>

          <div class="wishlist-menu__dropdown">
            <WishlistDropdown />
          </div>
        </div>

        <div class="lang-switch">
          <button type="button" :class="{ active: locale === 'ro' }" @click="setLocale('ro')">RO</button>
          <button type="button" :class="{ active: locale === 'ru' }" @click="setLocale('ru')">RU</button>
          <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
        </div>

        <NuxtLink to="/cart" class="site-nav__link cart-link cart-link--icon">
          <span class="cart-link__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 4h2l1.2 6.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L20 6H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="10" cy="19" r="1.6" fill="currentColor"/>
              <circle cx="17" cy="19" r="1.6" fill="currentColor"/>
            </svg>
          </span>
          <span>{{ t.cart }} • {{ cartCount }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.wishlist-menu{
  position:relative;
  display:flex;
  align-items:center;
}

.wishlist-link--icon{
  position:relative;
  width:46px;
  min-width:46px;
  height:46px;
  padding:0;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}

.wishlist-link__icon{
  font-size:18px;
  line-height:1;
}

.wishlist-link__count{
  position:absolute;
  top:-4px;
  right:-4px;
  min-width:20px;
  height:20px;
  padding:0 5px;
  border-radius:999px;
  background:#2f7d57;
  color:#fff;
  font-size:11px;
  font-weight:900;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 8px 18px rgba(47,125,87,.20);
}

.wishlist-menu__dropdown{
  position:absolute;
  top:calc(100% + 12px);
  right:0;
  opacity:0;
  visibility:hidden;
  transform:translateY(8px);
  transition:all .18s ease;
  pointer-events:none;
  z-index:60;
}

.wishlist-menu:hover .wishlist-menu__dropdown{
  opacity:1;
  visibility:visible;
  transform:translateY(0);
  pointer-events:auto;
}

@media (max-width: 900px){
  .wishlist-menu__dropdown{
    display:none;
  }
}
</style>

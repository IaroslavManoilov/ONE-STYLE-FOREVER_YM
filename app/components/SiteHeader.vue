<script setup lang="ts">
const { locale, setLocale, t } = useStoreProducts()
const { count } = useCart()
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

        <div class="lang-switch">
          <button type="button" :class="{ active: locale === 'ro' }" @click="setLocale('ro')">RO</button>
          <button type="button" :class="{ active: locale === 'ru' }" @click="setLocale('ru')">RU</button>
          <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
        </div>

        <NuxtLink to="/cart" class="site-nav__link cart-link">
          {{ t.cart }} • {{ count }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

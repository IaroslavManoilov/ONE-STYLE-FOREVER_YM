<script setup lang="ts">
const { t, brandInfo } = useStoreProducts()
</script>

<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div>
        <div class="footer__brand">
          <span class="footer__brand-mark">
            <img src="/images/brand/logo-cs.png" alt="CS" />
          </span>

          <div>
            <div class="footer__title">ONE_STYLE</div>
            <div class="footer__sub">FOREVER</div>
          </div>
        </div>

        <div class="footer__text">{{ t.footerText }}</div>
      </div>

      <div>
        <div class="footer__head">{{ t.footerLinks }}</div>
        <div class="footer__links">
          <NuxtLink to="/">{{ t.navHome }}</NuxtLink>
          <NuxtLink to="/catalog">{{ t.navCatalog }}</NuxtLink>
          <NuxtLink to="/about">{{ t.navAbout }}</NuxtLink>
        </div>
      </div>

      <div>
        <div class="footer__head">{{ t.footerContacts }}</div>
        <div class="footer__links">
          <a :href="`tel:${brandInfo.phone}`">{{ brandInfo.phone }}</a>
          <a :href="`mailto:${brandInfo.email}`">{{ brandInfo.email }}</a>
          <a :href="brandInfo.instagramUrl" target="_blank" rel="noopener noreferrer">@{{ brandInfo.instagram }}</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      {{ t.footerCopyright }}
    </div>
  </footer>
</template>

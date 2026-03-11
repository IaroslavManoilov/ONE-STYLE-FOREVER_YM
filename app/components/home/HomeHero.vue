<script setup lang="ts">
const { t } = useStoreProducts()
</script>

<template>
  <section class="section">
    <div class="container hero-grid">
      <div class="card hero-card">
        <div class="hero-pills">
          <span class="pill">{{ t.location }}</span>
          <span class="pill">{{ t.featured }}</span>
        </div>

        <h1 class="hero-title">{{ t.brand }}</h1>

        <p class="hero-text">{{ t.subtitle }}</p>

        <div class="hero-actions">
          <NuxtLink to="/catalog" class="btn btn-primary">{{ t.ctaCatalog }}</NuxtLink>
          <NuxtLink to="/about" class="btn btn-secondary">{{ t.ctaAbout }}</NuxtLink>
        </div>

        <div class="hero-benefits">
          <span class="pill">{{ t.fastDelivery }}</span>
          <span class="pill">{{ t.actualPrices }}</span>
          <span class="pill">{{ t.chatSupport }}</span>
          <span class="pill">{{ t.premiumStyle }}</span>
        </div>
      </div>

      <div class="card hero-side">
        <div class="hero-side__stage">
          <img src="/images/brand/logo-circle.png" alt="ONE_STYLE FOREVER" />
        </div>

        <div class="hero-side__logos">
          <div class="hero-side__logo">
            <img src="/images/brand/logo-circle.png" alt="ONE_STYLE FOREVER" />
          </div>

          <div class="hero-side__logo">
            <img src="/images/brand/logo-cs.png" alt="OSF" />
          </div>
        </div>

        <div class="hero-note">
          <div class="hero-note__title">{{ t.brandTitle }}</div>
          <div class="hero-note__text">{{ t.brandText }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, brandInfo } = useStoreProducts()
</script>

<template>
  <section class="section-small">
    <div class="container about-content">
      <div class="card info-card">
        <h2>{{ t.missionTitle }}</h2>
        <p>{{ t.missionText }}</p>
      </div>

      <div class="card info-card">
        <h2>{{ t.founderTitle }}</h2>
        <p>{{ t.founderText }}</p>
      </div>
    </div>

    <div class="container card values-card">
      <h2 class="page-title" style="font-size:34px;">{{ t.valuesTitle }}</h2>

      <div class="values-grid">
        <div class="value-item">
          <h3>{{ t.value1Title }}</h3>
          <p>{{ t.value1Text }}</p>
        </div>
        <div class="value-item">
          <h3>{{ t.value2Title }}</h3>
          <p>{{ t.value2Text }}</p>
        </div>
        <div class="value-item">
          <h3>{{ t.value3Title }}</h3>
          <p>{{ t.value3Text }}</p>
        </div>
        <div class="value-item">
          <h3>{{ t.value4Title }}</h3>
          <p>{{ t.value4Text }}</p>
        </div>
      </div>
    </div>

    <div class="container card contacts-card">
      <h2 class="page-title" style="font-size:34px;">{{ t.contactsTitle }}</h2>

      <div class="contact-row">
        <span>{{ t.phoneLabel }}</span>
        <a :href="`tel:${brandInfo.phone}`">{{ brandInfo.phone }}</a>
      </div>

      <div class="contact-row">
        <span>{{ t.emailLabel }}</span>
        <a :href="`mailto:${brandInfo.email}`">{{ brandInfo.email }}</a>
      </div>

      <div class="contact-row">
        <span>{{ t.instagramLabel }}</span>
        <a :href="brandInfo.instagramUrl" target="_blank" rel="noopener noreferrer">@{{ brandInfo.instagram }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isVisible, message, type, hide } = useToast()
</script>

<template>
  <Teleport to="body">
    <transition name="toast-pop">
      <div
        v-if="isVisible"
        class="toast"
        :class="`toast--${type}`"
        role="status"
        aria-live="polite"
      >
        <div class="toast__content">
          <span class="toast__dot" />
          <span class="toast__text">{{ message }}</span>
        </div>

        <button type="button" class="toast__close" @click="hide">×</button>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.toast{
  position:fixed;
  right:20px;
  bottom:20px;
  z-index:300;
  min-width:280px;
  max-width:min(420px, calc(100vw - 24px));
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  padding:14px 16px;
  border-radius:18px;
  background:rgba(15,23,42,.96);
  color:#fff;
  box-shadow:0 16px 36px rgba(15,23,42,.18);
  border:1px solid rgba(255,255,255,.08);
}

.toast--success{
  background:linear-gradient(135deg,#1f3a2c 0%,#2f7d57 100%);
}

.toast--info{
  background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
}

.toast__content{
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
}

.toast__dot{
  width:10px;
  height:10px;
  border-radius:50%;
  background:#dff3e7;
  flex:0 0 auto;
}

.toast__text{
  font-size:14px;
  font-weight:800;
  line-height:1.45;
  word-break:break-word;
}

.toast__close{
  border:none;
  background:transparent;
  color:#fff;
  font-size:22px;
  line-height:1;
  cursor:pointer;
  opacity:.86;
}

.toast-pop-enter-active,
.toast-pop-leave-active{
  transition:all .22s ease;
}

.toast-pop-enter-from,
.toast-pop-leave-to{
  opacity:0;
  transform:translateY(14px) scale(.98);
}

@media (max-width: 640px){
  .toast{
    right:10px;
    left:10px;
    bottom:10px;
    min-width:auto;
    max-width:none;
  }
}
</style>

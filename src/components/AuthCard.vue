<template>
  <div class="auth-page">
    <div class="auth-card">
      <!-- Brand / illustration side -->
      <div class="auth-brand">
        <div class="brand-top">
          <div class="brand-logo">
            <i class="bi bi-wallet2"></i>
          </div>
          <span class="brand-name">Smart Budget</span>
        </div>

        <div class="brand-balance">
          <span class="balance-label">Total balance</span>
          <span class="balance-value">₴24,580<span class="balance-cents">.00</span></span>
          <span class="balance-trend"><i class="bi bi-arrow-up-right"></i> +12.4% this month</span>

          <svg class="brand-chart" viewBox="0 0 320 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="authChartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#6ee7b7" stop-opacity="0.45" />
                <stop offset="1" stop-color="#6ee7b7" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,52 L40,44 L80,48 L120,32 L160,38 L200,22 L240,26 L280,12 L320,17 L320,70 L0,70 Z"
              fill="url(#authChartFill)"
            />
            <path
              d="M0,52 L40,44 L80,48 L120,32 L160,38 L200,22 L240,26 L280,12 L320,17"
              fill="none"
              stroke="#6ee7b7"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <ul class="brand-features">
          <li><i class="bi bi-bank2"></i> All your accounts in one place</li>
          <li><i class="bi bi-pie-chart-fill"></i> Smart budgets &amp; spending insights</li>
          <li><i class="bi bi-bullseye"></i> Reach your savings goals faster</li>
        </ul>

        <span class="brand-blob blob-1"></span>
        <span class="brand-blob blob-2"></span>
      </div>

      <!-- Form side -->
      <div class="auth-form">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(1200px 600px at 10% 10%, #eef0ff 0%, transparent 60%),
              radial-gradient(1000px 500px at 100% 100%, #e7fbf3 0%, transparent 55%),
              #f0f2f5;
}

.auth-card {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 580px;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(30, 30, 60, 0.16);
}

/* ---- Brand side ---- */
.auth-brand {
  position: relative;
  flex: 1 1 46%;
  padding: 40px 36px;
  color: #fff;
  background: linear-gradient(150deg, #6366f1 0%, #7c3aed 55%, #8b5cf6 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
}

.brand-logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-balance {
  z-index: 1;
  margin-top: 34px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.balance-label {
  font-size: 0.78rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.balance-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.balance-cents {
  font-size: 1.1rem;
  opacity: 0.7;
}

.balance-trend {
  font-size: 0.82rem;
  color: #6ee7b7;
  font-weight: 600;
}

.brand-chart {
  width: 100%;
  height: 56px;
  margin-top: 6px;
  display: block;
}

.brand-features {
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: auto 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.brand-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  opacity: 0.95;
}

.brand-features .bi {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.brand-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.35;
}

.blob-1 {
  width: 220px;
  height: 220px;
  top: -70px;
  right: -60px;
  background: radial-gradient(circle, #a78bfa, transparent 70%);
}

.blob-2 {
  width: 180px;
  height: 180px;
  bottom: -50px;
  left: -40px;
  background: radial-gradient(circle, #34d399, transparent 70%);
}

/* ---- Form side ---- */
.auth-form {
  flex: 1 1 54%;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .auth-brand {
    display: none;
  }
  .auth-card {
    max-width: 440px;
    min-height: auto;
  }
}
</style>

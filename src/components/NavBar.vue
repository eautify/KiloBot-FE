<template>
  <nav class="navbar">
    <div class="logo">NEST.Net</div>

    <div class="menu-toggle" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>

    <ul class="nav-list" :class="{ active: isMenuOpen }">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li v-if="isAdmin"><router-link to="/settings">Settings</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/developers">Developer</router-link></li>
      <li><a href="#" @click="confirmLogout" class="logout">Logout</a></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const userRole = ref('')
onMounted(() => {
  userRole.value = localStorage.getItem('userRole') || 'guest'
})

const isAdmin = computed(() => userRole.value === 'admin')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const confirmLogout = () => {
  if (confirm('Are you sure you want to log out?')) {
    logout()
  }
}

const logout = () => {
  localStorage.removeItem('userRole')
  router.push('/')
}
</script>

<style scoped>
/* NAVIGATION BAR SECTION */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #35566d;
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.navbar a {
  color: #ffffe1;
  text-decoration: none;
}

.logo {
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #ffffe1;
}

.nav-list {
  list-style: none;
  display: flex;
  position: relative;
  /* Added for positioning the underline */
}

.nav-list li {
  margin-left: 2rem;
  position: relative;
  /* Added for positioning the underline */
}

.nav-list a {
  padding: 3px 20px;
  position: relative;
  /* Required for positioning the underline */
  transition: color 0.3s;
}

.nav-list a::after {
  content: '';
  display: block;
  height: 2px;
  /* Height of the underline */
  width: 0;
  /* Start with width 0 */
  background: #58cbdd;
  /* Underline color */
  transition: width 0.3s;
  /* Animation duration */
  position: absolute;
  left: 0;
  bottom: -5px;
  /* Position the underline below the text */
}

.nav-list a:hover {
  color: #58cbdd;
  /* Change to your desired hover color */
}

.nav-list a:hover::after {
  width: 100%;
  /* Expand the underline to full width on hover */
}

.nav-list a.active {
  color: #58cbdd;
  /* Change to your desired active color */
  font-weight: bold;
  /* Make the active link bold */
}

.nav-list a.active::after {
  width: 100%;
  /* Keep the underline full width for the active link */
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  height: 3px;
  width: 25px;
  background-color: #ffffe1;
  margin: 3px 0;
}

@media (max-width: 768px) {
  .nav-list {
    text-align: center;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #35566d;
    width: 100%;
    padding: 1rem 20px;
  }

  .nav-list.active {
    display: flex;
    /* Show when active */
  }

  .nav-list li {
    padding: 1rem;
    /* Increase padding for touch targets */
    border-bottom: 1px solid #ffffe1;
    /* Optional: Add borders for separation */
    margin: 0;
  }

  .menu-toggle {
    display: flex;
    /* Show hamburger icon */
    cursor: pointer;
    /* Pointer cursor for interaction */
  }

  .bar {
    height: 3px;
    /* Height of the hamburger bars */
    width: 25px;
    /* Width of the hamburger bars */
    background-color: #ffffe1;
    /* Color of the bars */
    margin: 3px 0;
    /* Spacing between bars */
  }
}
</style>

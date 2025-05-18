<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Create refs for the hamburger menu and nav menu
const hamburger = ref<HTMLElement | null>(null);
const navMenu = ref<HTMLElement | null>(null);
const navLinks = ref<NodeListOf<HTMLAnchorElement> | null>(null);

// Toggle mobile menu when hamburger is clicked
const toggleMenu = () => {
  if (hamburger.value && navMenu.value) {
    hamburger.value.classList.toggle("active");
    navMenu.value.classList.toggle("active");

    // Add accessibility attributes
    const isExpanded = hamburger.value.classList.contains("active");
    hamburger.value.setAttribute("aria-expanded", String(isExpanded));
  }
};

// Close mobile menu when a nav link is clicked
const closeMenu = () => {
  if (hamburger.value && navMenu.value) {
    hamburger.value.classList.remove("active");
    navMenu.value.classList.remove("active");
    hamburger.value.setAttribute("aria-expanded", "false");
  }
};

// Add accessibility support
const addAccessibility = () => {
  if (hamburger.value) {
    // Add ARIA attributes to hamburger menu
    hamburger.value.setAttribute("aria-label", "Toggle navigation menu");
    hamburger.value.setAttribute("aria-expanded", "false");
    hamburger.value.setAttribute("role", "button");
    hamburger.value.setAttribute("tabindex", "0");

    // Allow keyboard activation of hamburger menu
    hamburger.value.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }
};

// Lifecycle hook to set up event listeners
onMounted(() => {
  if (hamburger.value) {
    hamburger.value.addEventListener("click", toggleMenu);
  }

  navLinks.value = document.querySelectorAll(".nav-links a");
  if (navLinks.value) {
    navLinks.value.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  addAccessibility();
});
</script>

<template>
  <header class="navbar">
    <div class="logo">
      <router-link to="/dashboard">Dashboard</router-link>
    </div>

    <nav class="nav-menu" ref="navMenu">
      <ul class="nav-links">
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/fruits_database">Fruits Database</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>

    <div class="hamburger" ref="hamburger">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </header>
</template>

<style scoped>
.content {
  max-width: 1200px;
  margin: 100px auto 0;
  padding: 0 20px;
  text-align: center;
}

.content h1 {
  margin-bottom: 20px;
  color: #333;
}

/* Navbar Styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* Logo Styles */
.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo a:hover {
  color: #3498db;
}

/* Navigation Menu Styles */
.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 2rem;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #3498db;
}

/* Active link indicator */
.nav-links a.active {
  color: #3498db;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: white;
  transition: all 0.3s ease;
}

/* Mobile Responsive Styles */
@media only screen and (max-width: 768px) {
  /* Show hamburger menu on mobile */
  .hamburger {
    display: block;
  }

  /* Animate hamburger to X when menu is active */
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Position the nav menu for mobile */
  .nav-menu {
    position: fixed;
    top: 70px; /* Height of the navbar */
    left: -100%;
    width: 100%;
    background-color: #2c3e50;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }

  /* Show nav menu when active class is added */
  .nav-menu.active {
    left: 0;
  }

  /* Stack nav links vertically */
  .nav-links {
    flex-direction: column;
    padding: 20px 0;
  }

  .nav-links li {
    margin: 10px 0;
  }
}

</style>
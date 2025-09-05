<template>
  <header>
    <div class="navbar-left">
      <NuxtLink to="/" id="to-splash-screen">
        <NuxtImg
          src="/images/ff-logo.svg"
          alt="Fully Formed logo"
          id="ff-logo"
        />
      </NuxtLink>
      <nav class="primary-navigation">
        <ul>
          <li>
            <NuxtLink to="/home">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/docs">Docs</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/apireference">API Reference</NuxtLink>
          </li>
          <form class="search-bar">
            <NuxtImg
              src="/images/magnifying-glass.svg"
              alt=""
              class="magnifying-glass"
            />
            <input type="search" placeholder="Search..." />
          </form>
        </ul>
      </nav>
    </div>
    <div class="navbar-right">
      <nav class="secondary-navigation">
        <ul>
          <li>
            <NuxtImg
              src="/images/github-logo.svg"
              alt="Github icon"
              class="icon"
            />
          </li>
          <li>
            <NuxtImg src="/images/npm-logo.svg" alt="NPM icon" class="icon" />
          </li>
          <li>
            <NuxtImg
              src="/images/buy-me-a-coffee-logo.svg"
              alt="Buy Me a Coffee icon"
              class="icon"
            />
          </li>
        </ul>
      </nav>
      <!-- <button
        @click="toggleHamburgerMenu"
        class="hamburger-menu"
        :class="hamburgerMenuButtonClass"
      ></button>
      <Transition name="hamburger-menu"
        ><menu class="hamburger-menu" v-if="isHamburgerMenuOpen"></menu
      ></Transition> -->
    </div>
  </header>
</template>

<script setup lang="ts">
const isHamburgerMenuOpen = ref(false);

function toggleHamburgerMenu() {
  isHamburgerMenuOpen.value = !isHamburgerMenuOpen.value;
}
</script>

<style scoped>
header,
.navbar-left,
.navbar-right,
ul {
  display: flex;
  align-items: center;
}

header {
  justify-content: space-between;
  padding: 0 46px;
  background-color: #00000099;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  font-family: "Monomaniac One";
  font-size: 30px;
  text-decoration: none;
}

a.router-link-active {
  text-decoration: underline;
}

#ff-logo {
  width: 90px;
  height: auto;
  margin-top: 24px;
  margin-bottom: 12px;
}

.primary-navigation {
  margin-left: 64px;
}

.primary-navigation > ul {
  display: flex;
  align-items: center;
}

.primary-navigation > ul > li:has(+ li),
.primary-navigation > ul > li:has(+ form) {
  margin-right: 40px;
}

.search-bar {
  border: 1px solid #7acdc8;
  border-radius: 7px;
  background-color: #000000;
  display: flex;
  align-items: center;
  width: 220px;
  margin-top: 4px;
}

.magnifying-glass {
  height: 20px;
  width: auto;
  margin: 8px;
}

.search-bar > input {
  background-color: #000000;
  border: none;
  flex: 1;
}

.search-bar > input,
.search-bar > input::placeholder {
  font-size: 15px;
  color: #7acdc8;
}

.search-bar > input:focus {
  outline: none;
}

.search-bar > input::-webkit-search-cancel-button {
  display: none;
}

.secondary-navigation > ul {
  justify-content: flex-end;
}

.secondary-navigation .icon {
  width: 37px;
  height: 37px;
}

.secondary-navigation li:has(+ li) {
  margin-right: 30px;
}
</style>

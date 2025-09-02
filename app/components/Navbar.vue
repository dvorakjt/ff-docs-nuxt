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
        </ul>
      </nav>
    </div>
    <div class="navbar-right">
      <nav class="secondary-navigation"></nav>
      <button
        @click="toggleHamburgerMenu"
        class="hamburger-menu"
        :class="hamburgerMenuButtonClass"
      ></button>
      <Transition name="hamburger-menu"
        ><menu class="hamburger-menu" v-if="isHamburgerMenuOpen"></menu
      ></Transition>
    </div>
  </header>
</template>

<script setup>
const isHamburgerMenuOpen = ref(false);

function toggleHamburgerMenu() {
  isHamburgerMenuOpen.value = !isHamburgerMenuOpen.value;
}
</script>

<style scoped></style>

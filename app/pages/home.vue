<template>
  <div>
    <section class="hero">
      <h1 id="heading-home-page" class="heading">Fully Formed</h1>
      <p class="tagline">
        Fully Formed provides powerful, type-safe, style-agnostic form state
        management for React with TypeScript.
      </p>
      <div class="hero-buttons">
        <BaseButton variant="primary">Get Started</BaseButton>
        <BaseButton variant="secondary">Learn More</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heading {
  text-transform: uppercase;
  font-size: 45px;
  text-align: center;
  margin-bottom: 50px;
}

/* todo: add media queries */
.tagline {
  margin-bottom: 70px;
  font-size: 30px;
  font-weight: 500;
  width: 45%;
  text-align: center;
}

.hero-buttons > button:first-child {
  margin-right: 100px;
}

@media screen and (min-width: 344px) {
  .heading {
    font-size: 50px;
  }
}

@media screen and (min-width: 360px) {
  .heading {
    font-size: 55px;
  }
}

@media screen and (min-width: 390px) {
  .heading {
    font-size: 60px;
  }
}

@media screen and (min-width: 428px) {
  .heading {
    font-size: 65px;
  }
}

@media screen and (min-width: 540px) {
  .heading {
    font-size: 75px;
  }
}

@media screen and (min-width: 700px) {
  .heading {
    font-size: 95px;
  }
}

@media screen and (min-width: 744px) {
  .heading {
    font-size: 100px;
  }
}

@media screen and (min-width: 768px) {
  .heading {
    font-size: 105px;
  }
}

@media screen and (min-width: 834px) {
  .heading {
    font-size: 115px;
  }
}

@media screen and (min-width: 912px) {
  .heading {
    font-size: 130px;
  }
}

@media screen and (min-width: 1024px) {
  .heading {
    font-size: 150px;
  }
}

@media screen and (orientation: landscape) {
  .heading {
    font-size: 45px;
    margin-bottom: 10px;
  }
}

@media screen and (orientation: landscape) and (min-height: 375px) {
  .heading {
    font-size: 50px;
  }
}

@media screen and (orientation: landscape) and (min-height: 402px) {
  .heading {
    font-size: 55px;
  }
}

@media screen and (orientation: landscape) and (min-height: 428) {
  .heading {
    font-size: 60px;
  }
}

@media screen and (orientation: landscape) and (min-height: 430) {
  .heading {
    font-size: 65px;
  }
}

@media screen and (orientation: landscape) and (min-height: 540) {
  .heading {
    margin-bottom: 20px;
  }
}

@media screen and (orientation: landscape) and (max-width: 720) and (min-height: 540) {
  .heading {
    font-size: 50px;
  }
}

@media screen and (orientation: landscape) and (min-height: 700px) {
  .heading {
    font-size: 100px;
    margin-bottom: 30px;
  }
}

@media screen and (orientation: landscape) and (min-height: 768px) {
  .heading {
    font-size: 110px;
  }
}

@media screen and (orientation: landscape) and (min-height: 834px) {
  .heading {
    font-size: 120px;
  }
}

@media screen and (orientation: landscape) and (min-height: 912px) {
  .heading {
    font-size: 130px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) {
  .heading {
    font-size: 145px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) and (min-width: 1920px) {
  .heading {
    font-size: 150px;
  }
}
</style>

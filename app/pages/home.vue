<template>
  <div>
    <section id="hero-home">
      <h1 id="heading-home">Fully Formed</h1>
      <p id="tagline-home">
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
#hero-home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#heading-home {
  text-transform: uppercase;
  font-size: 45px;
  text-align: center;
  margin-bottom: 50px;
}

/* todo: add media queries */
#tagline-home {
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
  #heading-home {
    font-size: 50px;
  }
}

@media screen and (min-width: 360px) {
  #heading-home {
    font-size: 55px;
  }
}

@media screen and (min-width: 390px) {
  #heading-home {
    font-size: 60px;
  }
}

@media screen and (min-width: 428px) {
  #heading-home {
    font-size: 65px;
  }
}

@media screen and (min-width: 540px) {
  #heading-home {
    font-size: 75px;
  }
}

@media screen and (min-width: 700px) {
  #heading-home {
    font-size: 95px;
  }
}

@media screen and (min-width: 744px) {
  #heading-home {
    font-size: 100px;
  }
}

@media screen and (min-width: 768px) {
  #heading-home {
    font-size: 105px;
  }
}

@media screen and (min-width: 834px) {
  #heading-home {
    font-size: 115px;
  }
}

@media screen and (min-width: 912px) {
  #heading-home {
    font-size: 130px;
  }
}

@media screen and (min-width: 1024px) {
  #heading-home {
    font-size: 150px;
  }
}

@media screen and (orientation: landscape) {
  #heading-home {
    font-size: 45px;
    margin-bottom: 10px;
  }
}

@media screen and (orientation: landscape) and (min-height: 375px) {
  #heading-home {
    font-size: 50px;
  }
}

@media screen and (orientation: landscape) and (min-height: 402px) {
  #heading-home {
    font-size: 55px;
  }
}

@media screen and (orientation: landscape) and (min-height: 428) {
  #heading-home {
    font-size: 60px;
  }
}

@media screen and (orientation: landscape) and (min-height: 430) {
  #heading-home {
    font-size: 65px;
  }
}

@media screen and (orientation: landscape) and (min-height: 540) {
  #heading-home {
    margin-bottom: 20px;
  }
}

@media screen and (orientation: landscape) and (max-width: 720) and (min-height: 540) {
  #heading-home {
    font-size: 50px;
  }
}

@media screen and (orientation: landscape) and (min-height: 700px) {
  #heading-home {
    font-size: 100px;
    margin-bottom: 30px;
  }
}

@media screen and (orientation: landscape) and (min-height: 768px) {
  #heading-home {
    font-size: 110px;
  }
}

@media screen and (orientation: landscape) and (min-height: 834px) {
  #heading-home {
    font-size: 120px;
  }
}

@media screen and (orientation: landscape) and (min-height: 912px) {
  #heading-home {
    font-size: 130px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) {
  #heading-home {
    font-size: 145px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) and (min-width: 1920px) {
  #heading-home {
    font-size: 150px;
  }
}
</style>

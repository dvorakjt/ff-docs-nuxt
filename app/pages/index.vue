<template>
  <div class="screen">
    <img
      id="hero"
      class="hero"
      src="/images/ff-logo.svg"
      alt="Fully Formed logo"
    />
    <h1 class="heading">Fully Formed</h1>
    <p class="tagline">
      Flawless forms, <NuxtLink to="/home">just add water.</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero {
  transform-origin: top left;
  width: 230px;
  height: auto;
  /* 
    If using SCSS, these could be set with a variable which could be updated
    in media queries.
  */
  margin-bottom: 20px;
}

/* how best to share these styles...? Probably a class */
.heading {
  text-transform: uppercase;
  font-size: 45px;
  margin-bottom: 20px;
  text-align: center;
}

.tagline {
  font-size: 15px;
}

.tagline > a {
  color: #7acdc8;
  text-decoration: none;
}

.tagline > a:hover {
  text-decoration: underline;
}

@media screen and (min-width: 344px) {
  .hero {
    width: 260px;
    height: auto;
  }

  .heading {
    font-size: 50px;
  }
}

@media screen and (min-width: 360px) {
  .hero {
    width: 280px;
    height: auto;
  }

  .heading {
    font-size: 55px;
  }
}

@media screen and (min-width: 390px) {
  .hero {
    width: 300px;
    height: auto;
  }

  .heading {
    font-size: 60px;
  }
}

@media screen and (min-width: 428px) {
  .hero {
    width: 340px;
    height: auto;
  }

  .heading {
    font-size: 65px;
  }

  .tagline {
    font-size: 17px;
  }
}

@media screen and (min-width: 540px) {
  .hero {
    width: 350px;
    height: auto;
  }

  .heading {
    font-size: 75px;
  }

  .tagline {
    font-size: 18px;
  }
}

@media screen and (min-width: 700px) {
  .hero {
    width: 460px;
    height: auto;
  }

  .heading {
    font-size: 95px;
  }
}

@media screen and (min-width: 744px) {
  .hero {
    width: 500px;
    height: auto;
  }

  .heading {
    font-size: 100px;
  }
}

@media screen and (min-width: 768px) {
  .hero {
    width: 530px;
    height: auto;
  }

  .heading {
    font-size: 105px;
  }

  .tagline {
    font-size: 20px;
  }
}

@media screen and (min-width: 834px) {
  .hero {
    width: 600px;
    height: auto;
  }

  .heading {
    font-size: 115px;
  }
}

@media screen and (min-width: 912px) {
  .hero {
    width: 670px;
    height: auto;
  }

  .heading {
    font-size: 130px;
  }
}

@media screen and (min-width: 1024px) {
  .hero {
    width: 780px;
    height: auto;
  }

  .heading {
    font-size: 150px;
  }
}

@media screen and (orientation: landscape) {
  .hero {
    width: 200px;
    height: auto;
    margin-bottom: 10px;
  }

  .heading {
    font-size: 45px;
    margin-bottom: 10px;
  }

  .tagline {
    font-size: 18px;
  }
}

@media screen and (orientation: landscape) and (min-height: 375px) {
  .hero {
    width: 250px;
    height: auto;
  }

  .heading {
    font-size: 50px;
  }
}

@media screen and (orientation: landscape) and (min-height: 402px) {
  .hero {
    width: 255px;
    height: auto;
  }

  .heading {
    font-size: 55px;
  }
}

@media screen and (orientation: landscape) and (min-height: 428) {
  .hero {
    width: 260px;
    height: auto;
  }

  .heading {
    font-size: 60px;
  }
}

@media screen and (orientation: landscape) and (min-height: 430) {
  .hero {
    width: 265px;
    height: auto;
  }

  .heading {
    font-size: 65px;
  }
}

@media screen and (orientation: landscape) and (min-height: 440) {
  .hero {
    width: 270px;
    height: auto;
  }
}

@media screen and (orientation: landscape) and (min-height: 540) {
  .hero {
    width: 300px;
    height: auto;
    margin-bottom: 20px;
  }

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
  .hero {
    width: 450px;
    height: auto;
    margin-bottom: 30px;
  }

  .heading {
    font-size: 100px;
    margin-bottom: 30px;
  }

  .tagline {
    font-size: 20px;
  }
}

@media screen and (orientation: landscape) and (min-height: 768px) {
  .hero {
    width: 500px;
    height: auto;
  }

  .heading {
    font-size: 110px;
  }
}

@media screen and (orientation: landscape) and (min-height: 834px) {
  .hero {
    width: 550px;
    height: auto;
  }

  .heading {
    font-size: 120px;
  }
}

@media screen and (orientation: landscape) and (min-height: 912px) {
  .hero {
    width: 600px;
    height: auto;
  }

  .heading {
    font-size: 130px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) {
  .hero {
    width: 650px;
  }

  .heading {
    font-size: 145px;
  }

  .tagline {
    font-size: 25px;
  }
}

@media screen and (orientation: landscape) and (min-height: 1080px) and (min-width: 1920px) {
  .hero {
    width: 700px;
    height: auto;
  }

  .heading {
    font-size: 150px;
  }
}
</style>

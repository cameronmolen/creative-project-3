<template>
  <div class="story">
      <div class="page">
      <h1>Tenacity's Story</h1>
      <p>Every great innovation has its story. This is the story of how Tenacity came to be.</p>
      <img style="width: 100%; margin-bottom: 15px;" src="https://images.unsplash.com/photo-1514833298685-bbecd990f2df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="flame">
      <h2>The Spark</h2>
      <p>I served a two year, full-time mission for the church that I attend. As a missionary, I spent much of my time talking
      to strangers about the gospel of Jesus Christ and helping those who wanted to come closer to Him make and keep commitments
      that would allow them to better follow Him. </p>
      <p>Each commitment is a goal that is meant to increase the spirituality of a person,
      but their effectiveness is completely reliant upon the individual's keeping of said commitment.</p>
      <p>This was the beginning of how I came to see that goal setting with people to help you be accountable can be so
      powerful. I even decided that I would set a more temporal goal of cutting junk food out of my diet completely.</p>
      <p>It was not easy at first, and I required help from my fellow missionaries to help me stay true to the goal. However,
      using similar tactics of helping those I taught keep commitments, I was able to make leaps and bounds of improvement.</p>
      <h2>Returning Home</h2>
      <p>After returning home from my mission I realized that the less junk food I ate, the better I felt, so I continued the habit.
      Living this healthier lifestyle made me feel great and over time it became much easier and I no longer needed someone to
      remind me to stay true to my decision.</p>
      <p>I started college and friends noticed my healthy habit. After sharing my experience with them, some sought to persue similar
      health goals. I encouraged and assisted them as they strived to make that big lifestyle change, and I was able to feel the
      accomplishment of helping them to achieve their goals.</p>
      <img style="width: 100%; margin-bottom: 15px;" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"
      alt="laptop with java programming language">
      <h2>The Idea of Tenacity</h2>
      <p>The idea of Tenacity came about when some friends and I wanted to adopt some new habits. We created a group message
      where we could report on our progress through sending pictures and updates with how things were going for us and it
      worked really well.</p>
      <p>After this experiment I decided that an app with the built-in functionality to measure and share progress would
      be useful in helping people to be better at sticking to resolutions and achieving their goals.</p>
      <p>Tenacity is built upon simple principles, but will connect friends and family all across the world.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Story',
  components: {
  }
}
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem 2rem;
  line-height: 30px;
  text-align: left;
}

@media only screen and (min-width: 961px) {

  .page {
    padding: 2rem 250px;
    line-height: 30px;
  }
}

@media only screen and (max-width: 960px) and (min-width: 401px) {

  .page {
    padding: 2rem 250px;
    line-height: 30px;
  }
}
</style>

<template>
  <div class="timeline">
    <div class="page">
      <h1>Timeline</h1>
      <p>A timeline of the progress of Tenacity. Check back here as further developments unfold.</p>
      <div class="timeline">
        <div class="timeline-content-left">
          <h3>June 2019</h3>
          <p>Returned home from my two-year missionary service and realized how having accountability
          partners helped me achieve my goal to avoid junk food. Check out <router-link to="/story">my story</router-link>.</p>
        </div>
        <div class="timeline-content-right">
          <h3>December 2019</h3>
          <p>Began sketching out idea on paper and writing down functionality that the app
          would have.</p>
        </div>
        <div class="timeline-content-left">
          <h3>June 2020</h3>
          <p>Began learning SwiftUI and slowly started designing and constructing the app
          inside of Apple's XCode.</p>
        </div>
        <div class="timeline-content-right">
          <h3>August 2020</h3>
          <p>Created main activity and goal class along with metric setting to help track
          progress of goals and milestones.</p>
        </div>
        <div class="timeline-content-left">
          <h3>Coming Soon...</h3>
          <p>The design and features are being added as time goes forward. Projections estimate
          that the app will be fully developed in December of 2021.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Timeline',
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
}

@media only screen and (min-width: 961px) {

  .page {
    padding: 2rem 150px;
    line-height: 30px;
  }

  .timeline {
    width: 85%;
  }
}

@media only screen and (max-width: 960px) and (min-width: 401px) {

  .page {
    padding: 2rem 150px;
    line-height: 30px;
  }  

  .timeline {
    width: 85%;
  }
}

.timeline {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.timeline-content-left {
  display: flex;
  flex-direction: column;
  background-color: #EFEFEF;
  width: 100%;
  margin: 15px auto;
  padding: 20px;
  text-align: left;
}

.timeline-content-right {
  display: flex;
  flex-direction: column;
  background-color: #EFEFEF;
  width: 100%;
  margin: 15px auto;
  padding: 20px;
  text-align: right;
}
</style>

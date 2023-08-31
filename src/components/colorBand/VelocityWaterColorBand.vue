<template>
  <div class="colorLegend">
    <div class="legend-container">
      <div class="legend-1"></div>
      <div class="legend-2"></div>
      <div class="legend-3"></div>
      <div class="legend-4"></div>
      <div class="legend-5"></div>
      <div class="legend-6"></div>
      <div class="legend-7"></div>
      <div class="legend-8"></div>
      <div class="legend-9"></div>
      <div class="legend-10"></div>
    </div>

    <div class="eleNumber-container">
      <span class="eleNumber">0.0000</span>
      <span class="eleNumber">0.1800</span>
      <span class="eleNumber">0.3600</span>
      <span class="eleNumber">0.5400</span>
      <span class="eleNumber">0.7200</span>
      <span class="eleNumber">0.9000</span>
      <span class="eleNumber">1.0800</span>
      <span class="eleNumber">1.2600</span>
      <span class="eleNumber">1.4400</span>
      <span class="eleNumber">1.6200</span>
      <span class="eleNumber">1.8000</span>
    </div>

    <span class="unit">(单位: m/day)</span>
  </div>
</template>


<style scoped lang="scss">
$bright-white: rgba(248, 249, 249, 1);

.colorLegend {
  position: absolute;
  right: 25px;
  bottom: 35px;
  z-index: 1;
  width: 400px;
  background: transparent;

  .legend-container {
    display: flex;
    height: 20px;
    @for $i from 1 through 10 {
      .legend-#{$i} {
        width: 40px;
      }
    }

    .legend-1 {
      background-color: rgb(0, 0, 255);
    }

    .legend-2 {
      background-color: rgb(0, 120, 255);
    }

    .legend-3 {
      background-color: rgb(0, 231, 255);
    }

    .legend-4 {
      background-color: rgb(0, 255, 168);
    }

    .legend-5 {
      background-color: rgb(0, 255, 57);
    }

    .legend-6 {
      background-color: rgb(52, 255, 0);
    }

    .legend-7 {
      background-color: rgb(163, 255, 0);
    }

    .legend-8 {
      background-color: rgb(255, 236, 0);
    }

    .legend-9 {
      background-color: rgb(255, 125, 0);
    }

    .legend-10 {
      background-color: rgb(255, 0, 0);
    }
  }

  .eleNumber-container {
    display: flex;
    margin-right: 5px;
    .eleNumber {
      margin: 3px 9px 0 -3px;
      font-size: xx-small;
      font-weight: bold;
      color: $bright-white;
    }
  }

  .unit {
    font-size: xx-small;
    font-weight: bolder;
    color: $bright-white;
  }
}
</style>
<script setup>
</script>
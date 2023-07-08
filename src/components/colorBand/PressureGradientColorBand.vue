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
      <span class="eleNumber">4419</span>
      <span class="eleNumber">7084</span>
      <span class="eleNumber">9749</span>
      <span class="eleNumber">12413</span>
      <span class="eleNumber">15078</span>
      <span class="eleNumber">17743</span>
      <span class="eleNumber">20407</span>
      <span class="eleNumber">23072</span>
      <span class="eleNumber">25737</span>
      <span class="eleNumber">28401</span>
      <span class="eleNumber">31066</span>
    </div>

    <span class="unit">(单位: kpa)</span>
  </div>
</template>

<style scoped lang="scss">
$bright-white: rgba(248, 249, 249, 1);

.colorLegend {
  position: absolute;
  right: 105px;
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
      background: linear-gradient(to right, #0000ff, #000eff, #001dff, #002bff, #003aff)
    }

    .legend-2 {
      background: linear-gradient(to right, #003aff, #0048ff, #0057ff, #0065ff, #0074ff, #0082ff);
    }

    .legend-3 {
      background: linear-gradient(to right, #0082ff, #0091ff, #009fff, #00aeff, #00bcff, #00caff);
    }

    .legend-4 {
      background: linear-gradient(to right, #00caff, #00d9ff, #00e7ff, #00f5ff, #05fffa, #13ffec);
    }

    .legend-5 {
      background: linear-gradient(to right, #13ffec, #22ffdd, #30ffcf, #3effc0, #4dffb2, #5bffa4);
    }

    .legend-6 {
      background: linear-gradient(to right, #5bffa4, #6aff95, #78ff87, #87ff78, #95ff6a, #a4ff5b);
    }

    .legend-7 {
      background: linear-gradient(to right, #a4ff5b, #b2ff4d, #c0ff3e, #cfff30, #ddff22, #ecff13);
    }

    .legend-8 {
      background: linear-gradient(to right, #ecff13, #faff05, #fff500, #ffe700, #ffd900, #ffca00);
    }

    .legend-9 {
      background: linear-gradient(to right, #ffca00, #ffbc00, #ffad00, #ff9f00, #ff9000);
    }

    .legend-10 {
      background: linear-gradient(to right, #ff9000, #ff8200, #ff7300, #ff6500, #ff5700, #ff4800, #ff3a00, #ff2b00, #ff1d00, #ff0e00, #ff0000);
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
<template>
  <div class="wrapper">
    <HeaderComp />
    <div class="content">
      <SideBarComp />
      <div class="content-main">
        <HomeMain>
          <div>main</div>
        </HomeMain>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeMain from "@/components/home/HomeMain.vue";
import SideBarComp from "@/components/home/SideBarComp.vue";
import HeaderComp from "@/components/home/HeaderComp.vue";

</script>

<style scoped lang="scss">
.content {
  display: flex;
  &-main {
    flex: 1;
    padding: 10px;
  }
}
</style>
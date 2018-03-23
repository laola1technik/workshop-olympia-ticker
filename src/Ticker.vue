<template>
  <div>
  <header-template/>
  <div class="main_container">
    <div class="main">
      <div class="stage">
        <live/>
        <footer-template/>
      </div> <!-- STAGE  ENDE -->
    </div> <!-- MAIN  ENDE -->
  </div> <!-- MAIN_CONTAINER ENDE -->
  </div>
</template>

<script>
    import HeaderTemplate from './components/Header.vue';
    import FooterTemplate from './components/Footer.vue';
    import Live from './components/Live.vue';

    export default {
        name: "ticker",
        components: { HeaderTemplate, FooterTemplate, Live }
    }
</script>

<style lang="less">
  @import './styles/olympiaTicker.less';
</style>
<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{ path: '/admin' }">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        Designed by
        <a href="#" target="_blank">Omoigui Efosa Abel</a>.
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style></style>

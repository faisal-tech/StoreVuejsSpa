<template lang="">
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="navbar-brand" href="#">Store</div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/Products" class="nav-link active" aria-current="page" href="#"
              >Products</router-link
            >
            <router-link to="/Suppliers" class="nav-link" href="#">Suppliers</router-link>
            <router-link to="/Statistics" class="nav-link" href="#">Statistics</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang=""></style>

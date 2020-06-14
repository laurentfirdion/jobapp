<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand><router-link to="/">DevJobs</router-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item ><router-link to="/">Accueil</router-link></b-nav-item>
        <b-nav-item><router-link to="/emplois">Offres d'emploi</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Rechercher"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Rechercher</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style lang="scss" scoped>
  a {
    color: #ffffff;
    &.router-link-exact-active {
      color: #6c757d;
      &:hover {
         color: #6c757d;
      }
    }
    &:hover {
       color: #ffffff;
    }
  }
  .navbar-brand a {
    color: #ffffff;
    &:hover {
       color: #ffffff;
       text-decoration: none;
    }
  }
</style>
<script lang="ts">
  import Logo from './Logo.svelte'
  import Menu from './Menu.svelte'
</script>

<header>
  <nav>
    <a href="/"><Logo /></a>
  </nav>
  <nav>
    <a href="/a-propos" class="button">Joindre l'équipe</a>
    <Menu />
  </nav>
</header>

<style lang="scss">
  header {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;

    display: flex;
    padding: $base;
    background-color: var(--background);
    border-bottom: 1px solid;

    nav {
      display: flex;
      gap: $base;
      flex: 1;

      &:last-child {
        justify-content: flex-end;
      }
    }
  }
</style>
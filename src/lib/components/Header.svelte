<script lang="ts">
  import Logo from './Logo.svelte'
  import Menu from './Menu.svelte'
</script>

<header>
  <nav>
    <a href="/"><Logo /></a>
  </nav>
  <nav>
    <a href="/carrieres" class="button">Joindre l'équipe</a>
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
    background-color: var(--background);
    
    border-top: 1px solid transparent;
    border-bottom: 1px solid;

    nav {
      display: flex;
      gap: $base;
      padding: $base;
      width: 50%;

      // border: 1px solid;

      &:first-child {
        margin-left: $base;
        border-left: 1px solid;
        border-right: 1px solid;
      }

      &:last-child {
        margin-right: $base;
        border-right: 1px solid;
        justify-content: flex-end;
      }
    }
  }
</style>
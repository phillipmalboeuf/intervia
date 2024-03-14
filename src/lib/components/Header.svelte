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
      align-items: center;
      gap: $base;
      padding: $base;
      width: 50%;

      @media (max-width: $mobile) {
        gap: $mobile_base * 0.5;
        padding: $mobile_base * 0.5;
      }

      &:first-child {
        margin-left: $base;
        border-left: 1px solid;
        border-right: 1px solid;

        @media (max-width: $mobile) {
          margin-left: ($mobile_base * 0.75);
          width: 33.3%;
          border-right: none;
        }
      }

      &:last-child {
        margin-right: $base;
        border-right: 1px solid;
        justify-content: flex-end;

        @media (max-width: $mobile) {
          margin-right: ($mobile_base * 0.75);
          width: 66.6%;
        }
      }
    }
  }
</style>
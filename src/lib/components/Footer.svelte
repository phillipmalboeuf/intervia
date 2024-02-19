<script lang="ts">
  import Logo from './Logo.svelte'
</script>

<footer>
  <nav>
    <a href="/"><Logo /></a>
    <a href="">7505 St-Hubert,<br>Montréal (QC)<br>H2R 2N7</a>
    <a href="tel:514 543-8002">514 543-8002</a>
    <div>
      <a href="">Facebook</a>
      <a href="">Instagram</a>
    </div>
  </nav>
  <nav>
    <!-- <a href="/a-propos" class="button">Joindre l'équipe</a> -->
    <a href="">© Intervia 2024</a>
  </nav>
</footer>

<style lang="scss">
  footer {
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);

    :global(.-services-popup) &,
    :global(.-services-\[id\]) & {
      color: $green-dark;
      background-color: $white;
    }

    :global(.-contact) & {
      color: var(--foreground);
      background-color: var(--background);
    }

    :global(.-a-propos) &,
    :global(.-articles) & {
      color: var(--foreground);
      background-color: $green-light;
    }

    display: flex;
    border-top: 1px solid;

    nav {
      display: flex;
      padding: $gap;
      gap: $gap * 6;

      &:first-child {
        margin-left: $base;
        border-left: 1px solid;
      }

      &:last-child {
        margin-right: $base;
        border-right: 1px solid;
        justify-content: flex-end;
        flex: 1;
      }

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
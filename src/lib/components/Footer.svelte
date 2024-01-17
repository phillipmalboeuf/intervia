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

    display: flex;
    padding: $base;
    border-top: 1px solid;

    nav {
      display: flex;
      gap: $gap * 6;

      &:last-child {
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
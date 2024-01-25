<script lang="ts">
  let open = false

  function hide() {
    open = false
  }
</script>

<button on:click={() => open = !open}>
  <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="-8.74228e-08" y1="1" x2="34" y2="0.999997" stroke-width="2"/>
  <line x1="-8.74228e-08" y1="17" x2="34" y2="17" stroke-width="2"/>
  <line x1="-8.74228e-08" y1="9" x2="34" y2="9" stroke-width="2"/>
  </svg>
</button>



<nav class:open>
  <aside>
    <a href="/" on:click={hide} class="button">Joindre l'équipe</a>

    <button on:click={hide}>
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
        <line y1="-1" x2="33.9843" y2="-1" transform="matrix(0.707434 -0.706779 0.707434 0.706779 1.5 25.9824)" stroke-width="2" stroke="currentColor"/>
        <line y1="-1" x2="33.9843" y2="-1" transform="matrix(0.707434 0.706779 -0.707434 0.706779 1.5 2.00391)" stroke-width="2"/>
      </svg>
    </button>
  </aside>

  <ul>
    <li><a on:click={hide} href="/" class="h1">À propos</a></li>
    <li><a on:click={hide} href="/services" class="h1">Nos services</a></li>
    <li><a on:click={hide} href="/projets" class="h1">Nos projets</a></li>
    <li><a on:click={hide} href="/" class="h1">Carrières</a></li>
    <li><a on:click={hide} href="/articles" class="h1">Actualités</a></li>
    <li><a on:click={hide} href="/contact" class="h1">Contact</a></li>
  </ul>
</nav>

<style lang="scss">
  button {
    border: none;
    padding: 0;
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(50vw + 1px);
    height: 100vh;

    color: $green-dark;
    background-color: $green-light;
    border-left: 1px solid;

    transform: translateX(100%);
    transition: transform 666ms;

    &.open {
      transform: translateX(0);
    }

    aside {
      padding: $base;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid transparent;
    }

    ul {
      border-top: 1px solid;
      list-style: none;
      padding: ($base * $scale * 2) $base;
    }
  }
</style>
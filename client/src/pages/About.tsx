import Style from "./About.module.css";

function About() {
  return (
    <>
      <header>
        <nav>
          <a href="/" className={Style.navLink}>Home</a>
          <a href="/Shop" className={Style.navLink}>Shop</a>
          <a href="/About" className={Style.navLink}>About</a>
        </nav>
      </header>
      <section className={Style.container}>
        <p>Je suis sur la page About</p>
      </section>
    </>
  );
}
export default About;

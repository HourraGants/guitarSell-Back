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
      <p>Je suis sur About</p>
    </>
  );
}
export default About;

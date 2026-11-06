import about from '../content/pages/about.json'

function About() {
  return (
    <section>
      <h1>{about.title}</h1>
      <p>{about.intro}</p>
    </section>
  )
}

export default About

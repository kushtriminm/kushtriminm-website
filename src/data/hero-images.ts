// The hero photos, in public/images/hero/. Add or remove a line to change them.
// The first photo is picked at random on the server (so the page opens with a photo, never black),
// then they play in a random order that is shuffled again after every round.
// focus = which part of the photo stays in view when the screen crops it.
// drift = which way the photo slowly moves while it is on screen.
export const heroImages = [
  {
    src: "/images/hero/egypt.jpg",
    sq: "Tempull i lashtë në Egjipt",
    en: "Ancient temple in Egypt",
    focus: "50% 45%",
    drift: { x: "-0.5%", y: "0.3%" },
  },
  {
    src: "/images/hero/maldives.jpg",
    sq: "Urë druri drejt vilave mbi ujë në Maldive",
    en: "Wooden jetty to overwater villas in the Maldives",
    focus: "50% 68%",
    drift: { x: "0%", y: "-0.6%" },
  },
  {
    src: "/images/hero/dubai.jpg",
    sq: "Deve në shkretëtirë me qytetin e Dubait pas",
    en: "Camels in the desert with the Dubai skyline behind",
    focus: "55% 55%",
    drift: { x: "0.6%", y: "0%" },
  },
  {
    src: "/images/hero/thailand.jpg",
    sq: "Pishinë mes palmave në Tajlandë",
    en: "Pool among palm trees in Thailand",
    focus: "50% 50%",
    drift: { x: "-0.6%", y: "-0.2%" },
  },
];

// A random photo to open the page with.
export function randomHeroImage() {
  return Math.floor(Math.random() * heroImages.length);
}

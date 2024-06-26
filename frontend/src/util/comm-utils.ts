export function getTextColorByTheme(theme: string) {
  /*
      "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
      "winter",
      */
  if (
    [
      "dark",
      "synthwave",
      "halloween",
      "forest",
      "black",
      "dracula",
      "business",
      "night",
      "coffee",
    ].includes(theme)
  ) {
    return "#ECEBEB";
  } else if (["luxury"].includes(theme)) {
    return "#F8E8BA";
  } else {
    return "#302F2F";
  }
}

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function numberWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

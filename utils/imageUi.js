export const createImage = (alt, src) => {
    const img = document.createElement("img");
    img.alt = alt;
    img.src = src;
  
    return img;
  };
  
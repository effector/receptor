type Coord = {
  x: number;
  y: number;
};

export const getHypotenuse = (a: number, b: number) => {
  return Math.sqrt(a ** 2 + b ** 2);
};

export const getDistance = (a: Coord, b: Coord) => {
  return getHypotenuse(a.x - b.x, a.y - b.y);
};

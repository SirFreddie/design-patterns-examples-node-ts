// RoundHole y RoundPeg son clases compatibles entre si.
// Un cilindro puede encajar en un agujero redondo si el radio del cilindro es menor o igual al radio del agujero.
class RoundHole {
  private radius: number;

  constructor(radius: number = 0) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  public fits(peg: RoundPeg): boolean {
    return this.getRadius() >= peg.getRadius();
  }
}

// Clase compatible.
class RoundPeg {
  private radius: number;

  constructor(radius: number = 0) {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }
}

// Clase incompatible.
class SquarePeg {
  private width: number;

  constructor(width: number = 0) {
    this.width = width;
  }

  public getWidth(): number {
    return this.width;
  }
}

/*
Una clase adaptadora te permite encajar piezas cuadradas en agujeros redondos.
Extiende la clase RoundPeg para permitir a los objetos adaptadores actuar como piezas redondas.
*/
class SquarePegAdapter extends RoundPeg {
  // En realidad, el adaptador contiene una instancia de la clase SquarePeg.
  private peg: SquarePeg;

  constructor(peg: SquarePeg) {
    super();
    this.peg = peg;
  }

  public getRadius(): number {
    // El adaptador simula que es una pieza redonda con un radio
    // que pueda albergar la pieza cuadrada que el adaptador envuelve.
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// En algun lugar del código cliente.
const roundHole = new RoundHole(5);
const roundPeg = new RoundPeg(5);
console.log("Does round peg fits?: ", roundHole.fits(roundPeg));

const smallSquarePeg = new SquarePeg(5);
const largeSquarePeg = new SquarePeg(10);
/*
Argument of type 'SquarePeg' is not assignable to parameter of type 'RoundPeg'.
  Type 'SquarePeg' is missing the following properties from type 'RoundPeg': radius, getRadiusts(2345)
*/
// roundHole.fits(smallSquarePeg);

const smallSquarePegAdapter = new SquarePegAdapter(smallSquarePeg);
const largeSquarePegAdapter = new SquarePegAdapter(largeSquarePeg);
console.log(
  "Does small square peg fits?: ",
  roundHole.fits(smallSquarePegAdapter)
);
console.log(
  "Does large square peg fits?: ",
  roundHole.fits(largeSquarePegAdapter)
);

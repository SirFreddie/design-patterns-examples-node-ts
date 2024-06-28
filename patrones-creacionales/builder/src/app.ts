/*
El uso del patrón Builder es adecuado cuando se necesita construir un objeto complejo con muchas partes
 y se quiere que el proceso de construcción sea independiente de las partes que lo componen y de cómo se ensamblan. 
 El patrón Builder permite construir objetos paso a paso, produciendo diferentes tipos y 
 representaciones de un objeto utilizando el mismo proceso de construcción.
*/
class Car {}

class Manual {}

// La interfaz Builder declara un conjunto de métodos para construir diferentes partes de un producto.
interface Builder {
  reset(): void;
  setSeats(seats: number): void;
  setEngine(engine: string): void;
  setTripComputer(tripComputer: boolean): void;
  setGPS(gps: boolean): void;
}

/*
Las clases constructoras concretas siguen la interfaz Builder y proporcionan implementaciones específicas
de los pasos de construcción. 
*/
class CarBuilder implements Builder {
  private car!: Car;

  /*
  Una nueva instancia de la clase constructora siempre debe contener un objeto de producto en blanco,
  el cual se utiliza en el ensamblaje posterior.
  */
  constructor() {
    this.reset();
  }

  // El metodo reset limpia el objeto en construcción.
  reset(): void {
    this.car = new Car();
  }

  setSeats(seats: number): void {
    console.log(`CarBuilder: setting ${seats} seats.`);
  }

  setEngine(engine: string): void {
    console.log(`CarBuilder: setting ${engine} engine.`);
  }

  setTripComputer(tripComputer: boolean): void {
    if (tripComputer) {
      console.log(`CarBuilder: setting trip computer.`);
      return;
    }
    console.log(`CarBuilder: trip computer not available.`);
  }

  setGPS(gps: boolean): void {
    if (gps) {
      console.log(`CarBuilder: setting GPS.`);
      return;
    }
    console.log(`CarBuilder: GPS computer not available.`);
  }

  getProduct(): Car {
    const product = this.car;
    this.reset();
    return product;
  }
}

// Al contrario que otros patrones creacionales, el patrón Builder no requiere que los productos tengan una interfaz común.
class CarManualBuilder implements Builder {
  private manual!: Manual;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.manual = new Manual();
  }

  setSeats(seats: number): void {
    console.log(`CarManualBuilder: setting ${seats} seats.`);
  }

  setEngine(engine: string): void {
    console.log(`CarManualBuilder: setting ${engine} engine.`);
  }

  setTripComputer(tripComputer: boolean): void {
    if (tripComputer) {
      console.log(`CarManualBuilder: setting trip computer.`);
      return;
    }
    console.log(`CarManualBuilder: trip computer not available.`);
  }

  setGPS(gps: boolean): void {
    if (gps) {
      console.log(`CarManualBuilder: setting GPS.`);
      return;
    }
    console.log(`CarManualBuilder: GPS computer not available.`);
  }

  getProduct(): Manual {
    const product = this.manual;
    this.reset();
    return product;
  }
}

// El director solo es responsable de ejecutar los pasos de construcción en un orden particular.
// Resulta util cuando se necesita un proceso de construcción específico.
// Esta clase es opcional, ya que el cliente puede controlar directamente el constructor.
class Director {
  /*
  El director funciona con cualquier instancia de constructor que el cliente le pase.
  De esta forma, el cliente puede cambiar el tipo de producto que se está construyendo.
  El director puede construir varios productos utilizando los mismos pasos de construcción.
  */
  constructSportsCar(builder: Builder): void {
    builder.setSeats(2);
    builder.setEngine("V8");
    builder.setTripComputer(true);
    builder.setGPS(true);
  }

  constructSUV(builder: Builder): void {
    builder.setSeats(4);
    builder.setEngine("V6");
    builder.setTripComputer(true);
    builder.setGPS(true);
  }
}

class Application {
  constructor() {
    console.log("--|Patrón Builder|--");

    const director = new Director();

    const carBuilder: CarBuilder = new CarBuilder();
    director.constructSportsCar(carBuilder);
    const car: Car = carBuilder.getProduct();
    console.log("Car object: ", car);

    const manualBuilder: CarManualBuilder = new CarManualBuilder();
    director.constructSportsCar(manualBuilder);
    const manual: Manual = manualBuilder.getProduct();
    console.log("Manual object: ", manual);
  }
}

const app = new Application();

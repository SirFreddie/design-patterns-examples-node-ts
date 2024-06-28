// Clase creadora.
abstract class Mail {
  public abstract createTransport(): Transport;

  public deliver(): void {
    const tranport: Transport = this.createTransport();
    tranport.deliver();
  }
}

// La interfaz de producto declara las operaciones que todos los productos concretos deben implementar.
interface Transport {
  deliver(): void;
}

// Los productos concretos proporcionan varias implementaciones de la interfaz de producto.
class Plane implements Transport {
  deliver(): void {
    console.log(`Plane deliver!`);
  }
}

class Truck implements Transport {
  deliver(): void {
    console.log(`Truck deliver!`);
  }
}

class Train implements Transport {
  deliver(): void {
    console.log(`Train deliver!`);
  }
}

// Los creadores concretos sobrescriben el método fábrica para cambiar el tipo de producto que crea.
class AirMail extends Mail {
  public createTransport(): Transport {
    return new Plane();
  }
}

enum GroundTransportType {
  TRUCK,
  TRAIN,
}

class GroundMail extends Mail {
  constructor(private type: GroundTransportType) {
    super();
  }

  public createTransport(): Transport {
    switch (this.type) {
      case GroundTransportType.TRUCK:
        return new Truck();
      case GroundTransportType.TRAIN:
        return new Train();
      default:
        throw new Error("Unsupported ground transport type.");
    }
  }
}

class Aplication {
  mail: Mail;

  constructor() {
    console.log("--|Patrón Factory Method - Ejemplo 2|--");

    this.mail = new GroundMail(GroundTransportType.TRUCK);
  }

  public main() {
    this.mail.deliver();
  }
}

// Ejecuta la aplicacion.
const app = new Aplication();
app.main();

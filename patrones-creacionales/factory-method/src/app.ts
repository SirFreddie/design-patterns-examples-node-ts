import * as os from "os";

/*
La clase creadora declara el método fábrica que debe devolver un objeto de una clase de producto.
Las subclases de la creadora proporcionan la implementación de este método. 
*/
abstract class Dialog {
  // La clase creadora declara el método fábrica que debe devolver un objeto de una clase de producto.
  // Puede proporcionar cierta implementacion  por defecto de este metodo.
  public abstract createButton(): Button;

  /*
  A pesar de su nombre, la principal responsabilidad de la clase creadora no es crear productos.
  Normalmente, contiene cierta lógica de negocio que se basa en los productos que devuelve el método fábrica.
  Las subclases pueden cambiar indirectamente esa lógica de negocio sobrescribiendo el método fábrica y 
  devolviendo un tipo diferente de producto.
  */
  public render(): void {
    // Llama al método fábrica para crear un objeto de producto.
    const confirmButton: Button = this.createButton();

    // Ahora, usa el producto, la logica de negocio central.
    confirmButton.render();
    confirmButton.onClick();
  }
}

// La interfaz de producto declara las operaciones que todos los productos concretos deben implementar.
interface Button {
  onClick(): void;
  render(): void;
}

// Los productos concretos proporcionan varias implementaciones de la interfaz de producto.
class WindowsButton implements Button {
  public onClick(): void {
    console.log(`WindowsButton clicked!`);
  }

  public render(): void {
    console.log(`WindowsButton rendered.`);
  }
}

class LinuxButton implements Button {
  public onClick(): void {
    console.log(`LinuxButton clicked!`);
  }

  public render(): void {
    console.log(`LinuxButton rendered.`);
  }
}

// Los creadores concretos sobrescriben el método fábrica para cambiar el tipo de producto que crea.
class WindowsDialog extends Dialog {
  public createButton(): Button {
    return new WindowsButton();
  }
}

class LinuxDialog extends Dialog {
  public createButton(): Button {
    return new LinuxButton();
  }
}

class Aplication {
  dialog: Dialog;

  constructor() {
    console.log("--|Patrón Factory Method|--");
    const platform = os.platform();

    // La aplicación elige el tipo de creador dependiendo de la plataforma.
    switch (platform) {
      case "win32":
        this.dialog = new WindowsDialog();
        break;
      case "linux":
        this.dialog = new LinuxDialog();
        break;
      default:
        throw new Error("Plataforma no soportada");
    }
  }

  public main() {
    this.dialog.render();
  }
}

// Ejecuta la aplicacion.
const app = new Aplication();
app.main();

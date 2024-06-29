import * as os from "os";

/*
La interfaz fabrica abstracta declara un conjunto de métodos que devuelven diferentes productos abstractos.
Estos productos se denominan familia y están relacionados por un tema o concepto de alto nivel.
Los productos de una familia suelen poder colaborar entre sí. 
Una familia de productos puede tener varias variantes, 
pero los productos de una variante son incompatibles con productos de otra.
*/
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

/*
Las fabricas concretas producen una familia de productos que pertenecen a una sola variante.
La fabrica garantiza que los productos resultantes sean compatibles.
Las firmas de los métodos de una fábrica concreta devuelven productos abstractos, 
mientras que dentro del método se instancia un producto concreto.
*/
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

// Los productos concretos son creados por las fabricas concretas correspondientes.
class LinuxFactory implements GUIFactory {
  createButton(): Button {
    return new LinuxButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

/*
Cada producto individual de una familia de productos debe tener una interfaz base.
Todas las variantes del producto deben implementar esta interfaz.
*/
interface Button {
  onClick(): void;
  render(): void;
}

// Los productos concretos proporcionan varias implementaciones de la interfaz de producto.
class WindowsButton implements Button {
  onClick(): void {
    console.log(`WindowsButton clicked!`);
  }

  render(): void {
    console.log(`WindowsButton rendered.`);
  }
}

class LinuxButton implements Button {
  onClick(): void {
    console.log(`LinuxButton clicked!`);
  }

  render(): void {
    console.log(`LinuxButton rendered.`);
  }
}

/*
Aqui esta la interfaz de otro producto. 
Todos los productos pueden interactuar entre si, pero solo con los productos de la misma variante concreta. 
*/
interface Checkbox {
  onCheck(): void;
  render(): void;
}

class WindowsCheckbox implements Checkbox {
  onCheck(): void {
    console.log(`WindowsCheckbox checked!`);
  }

  render(): void {
    console.log(`WindowsCheckbox rendered.`);
  }
}

/*
El codigo cliente trabaja con fabricas y productos solo a traves de tipos abstractos: GUIFactory, Button, Checkbox.
Esto permite pasar cualquier subclase de fabrica o producto a la aplicacion cliente.
*/
class Aplication {
  private factory: GUIFactory;
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    console.log("--|Patrón Abstract Factory - Ejemplo Base|--");

    this.factory = factory;
    this.button = this.factory.createButton();
    this.button.render();
    this.checkbox = this.factory.createCheckbox();
    this.checkbox.render();
  }
}

/*
La aplicacion elige el tipo de fabrica dependiendo de la plataforma y la crea en tiempo de ejecucion.
*/
class ApplicationConfigurator {
  main() {
    const platform = os.platform();

    switch (platform) {
      case "win32":
        new Aplication(new WindowsFactory());
        break;
      case "linux":
        new Aplication(new LinuxFactory());
        break;
      default:
        throw new Error("Plataforma no soportada");
    }
  }
}

// Ejecuta la aplicacion.
const app = new ApplicationConfigurator();
app.main();

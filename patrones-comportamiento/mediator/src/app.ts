/*
La interfaz mediadora declara un método de notificación que los componentes llamarán.
El mediador puede reaccionar a estos eventos y transmitir la ejecución a otros componentes.
*/
interface Mediator {
  notify(sender: object, event: string): void;
}

/*
La clase concreta mediadora. La red entrecruzada de conexiones entre componentes ha sido movida a esta clase.
*/
class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  // Cuando sucede algo con un componentem, notifica al mediador, que al recibir la notificacion,
  // puede hacer algo por su cuenta o pasar la solicitud a otro componente.
  public notify(sender: object, event: string): void {
    if (event === "A") {
      console.log("Mediator reacts on A and triggers B.");
      this.component2.doC();
    }

    if (event === "D") {
      console.log("Mediator reacts on D and triggers A.");
      this.component1.doA();
    }
  }
}

/*
Los componentes se comunican con un mediador utilizando la interfaz mediadora.
Gracias a ello, puedes utilizar los mismos componentes en otros contextos vinculandolo a otro mediador.
*/
class BaseComponent {
  protected mediator: Mediator | null;

  constructor(mediator: Mediator | null = null) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// Los componentes concretos no hablan entre si. Solo tienen un canal de comunicacion,
// que es el envio de notificaciones al mediador.
class Component1 extends BaseComponent {
  public doA(): void {
    console.log("Component 1 does A.");
    this.mediator?.notify(this, "A");
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log("Component 2 does C.");
    this.mediator?.notify(this, "D");
  }
}

// Usage
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

c1.doA();
c2.doC();

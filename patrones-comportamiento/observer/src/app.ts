// Interfaz subscriptora.
interface Subscriber {
  update(publisher: Publisher): void;
}

// La clase notificadora base incluye codigo de gestion de subscripciones y metodos de notificacion.
class Publisher {
  private subscribers: Subscriber[] = [];

  public subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber): void {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    if (subscriberIndex !== -1) {
      this.subscribers.splice(subscriberIndex, 1);
    }
  }

  public notify(): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(this);
    }
  }
}

/*
El notificador concreto contiene logica de negocio, de interes para algunos suscriptores.
Podemos derivar esta clase de la notificadora base, pero esto no siempre es posible en el mundo real
porque puede que la notificadora concreta sea ya una subclase. 
En este caso, podemos modificar la logica de la subscripcion con composicion, como hicimos aqui.
*/
class ConcretePublisher extends Publisher {
  public someBusinessLogic(): void {
    console.log("I'm about to do some thing important");
    this.notify();
  }
}

// Los subscriptores concretos reaccionan a las actualizacionas emitidas por el notificador al que estan unidos.
class ConcreteSubscribers implements Subscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(publisher: Publisher): void {
    console.log(`${this.name} received update.`);
  }
}

const publisher = new ConcretePublisher();
const subscriber1 = new ConcreteSubscribers("Subscriber 1");
const subscriber2 = new ConcreteSubscribers("Subscriber 2");
const subscriber3 = new ConcreteSubscribers("Subscriber 3");

publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);
publisher.subscribe(subscriber3);

publisher.someBusinessLogic();
publisher.unsubscribe(subscriber2);
publisher.someBusinessLogic();

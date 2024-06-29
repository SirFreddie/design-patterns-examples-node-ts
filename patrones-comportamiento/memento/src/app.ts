/*
El originador contiene informacion importante que puede cambiar con el paso del tiempo.
Tambien define un metodo para guardar el estado dentro de un memento,
y otro metodo para restaurar el estado desde un memento.
*/
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  // Guarda el estado actual dentro de un memento.
  public save(): Memento {
    // El memento es un objeto inmutable,
    // ese es el motivo por el que el originador pasa su estado a traves del constructor.
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento) {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): Date;
}

class ConcreteMemento implements Memento {
  private state: string;
  private date: Date;

  constructor(state: string) {
    this.state = state;
    this.date = new Date();
  }

  // La clase originadora usa este mentodo cuando restaura su estado.
  public getState(): string {
    return this.state;
  }

  // El resto de los metodos son usados por el Caretaker para mostrar metadata.
  public getName(): string {
    return `${this.date} / (${this.state})`;
  }

  public getDate(): Date {
    return this.date;
  }
}

/*
La clase Caretaker no depende del memento concreto.
Por lo tanto, no tiene acceso a los estados del originador, almacenados dentro del memento.
Trabaja con todos los mementos gracias a la interface Memento.
*/
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup() {
    console.log(`Caretaker: Saving Originator's state...`);
    this.mementos.push(this.originator.save());
  }

  public undo() {
    if (!this.mementos.length) {
      console.log("Caretaker: Nothing to undo");
      return;
    }
    const memento = this.mementos.pop();
    console.log(`Caretaker: Restoring state to: ${memento!.getName()}`);
    this.originator.restore(memento!);
  }

  public showHistory() {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

class MementoApplication {
  public main() {
    const originator = new Originator("Super-duper-super-puper-super.");
    const caretaker = new Caretaker(originator);

    caretaker.backup();
    originator.restore(new ConcreteMemento("New state!."));
    caretaker.backup();
    originator.restore(new ConcreteMemento("Super-super."));
    caretaker.backup();

    caretaker.showHistory();
  }
}

const mementoApp = new MementoApplication();
mementoApp.main();

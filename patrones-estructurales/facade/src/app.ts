class Subsystem1 {
  public operation1(): string {
    return "Subsystem1: Ready!\n";
  }
  public operationN(): string {
    return "Subsystem1: Go!\n";
  }
}

class Subsystem2 {
  public operation1(): string {
    return "Subsystem2: Ready!\n";
  }
  public operationZ(): string {
    return "Subsystem2: Fire!\n";
  }
}

class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1, subsystem2: Subsystem2) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  public operation(): string {
    return `Facade initializes subsystems:\n${this.subsystem1.operation1()}\n${this.subsystem2.operation1()}\nFacade orders subsystems to perform the action:\n${this.subsystem1.operationN()}\n${this.subsystem2.operationZ()}`;
  }
}

// Usage
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
console.log(facade.operation());

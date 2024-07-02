/*
La interfaz Strategy declara operaciones comunes a todas las versiones soportadas de algun algoritmo.
El contexto utiliza esta interfaz para invocar el algoritmo definido por una estrategia concreta.
*/
interface Strategy {
  execute(a: number, b: number): number;
}

/*
Las estrategias concretas implementan el algoritmo mientras siguen la interfaz estrategia base.
La interfaz las hace intercambiables en el contexto.
*/
class ConcreteStrategyAdd implements Strategy {
  public execute(a: number, b: number): number {
    return a + b;
  }
}

class ConcreteStrategySubstract implements Strategy {
  public execute(a: number, b: number): number {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  public execute(a: number, b: number): number {
    return a * b;
  }
}

// El contexto define la interfaz de interes para los clientes.
class Context {
  // El contexto mantiene una referencia a uno de los objetos de estrategia.
  // El contexto no conoce la clase concreta de una estrategia. Conoce solo la interfaz de la estrategia.
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  // El contexto delega parte del trabajo al objeto de estrategia en lugar de implementar varias versiones del algoritmo por si mismo.
  public executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}

class StrategyApplication {
  public static main(): void {
    const context = new Context(new ConcreteStrategyAdd());
    console.log("10 + 5 = " + context.executeStrategy(10, 5));

    context.setStrategy(new ConcreteStrategySubstract());
    console.log("10 - 5 = " + context.executeStrategy(10, 5));

    context.setStrategy(new ConcreteStrategyMultiply());
    console.log("10 * 5 = " + context.executeStrategy(10, 5));
  }
}

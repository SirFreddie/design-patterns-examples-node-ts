// La interfaz elemento declara un metodo 'accept' que toma la interfaz visitante base como argumento.
interface MyShape {
  move(x: number, y: number): void;
  draw(): void;
  accept(visitor: Visitor): void;
}

// Cada clase de elemento concreto debe implementar el metodo 'accept' de tal manera que invoque el
// metodo del visitante que corresponde a la clase del elemento.
class MyDot implements MyShape {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  public draw(): void {
    console.log(`Drawing a dot at (${this.x}, ${this.y})`);
  }

  // Invocamos el metodo 'visitDot', que coincide con el nombre de la clase actual.
  // De esta manera, el visitante puede identificar la clase del elemento que esta visitando.
  public accept(visitor: Visitor): void {
    visitor.visitDot(this);
  }
}

class MyCircle implements MyShape {
  public x: number;
  public y: number;
  public radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }

  public draw(): void {
    console.log(
      `Drawing a circle at (${this.x}, ${this.y}) with radius ${this.radius}`
    );
  }

  public accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

/*
La interfaz Visitor declara un grupo de metodos de visita que se corresponden con clases de elementos concretos.
La firma de estos metodos permite al visitante identificar el tipo exacto del elemento que esta visitando.
*/
interface Visitor {
  visitDot(dot: MyDot): void;
  visitCircle(circle: MyCircle): void;
}

class XMLExportVisitor implements Visitor {
  public visitDot(dot: MyDot): void {
    console.log(`<dot x="${dot.x}" y="${dot.y}"/>`);
  }

  public visitCircle(circle: MyCircle): void {
    console.log(
      `<circle x="${circle.x}" y="${circle.y}" radius="${circle.radius}"/>`
    );
  }
}

/*
El codigo cliente puede ejecutar operaciones del visitante sobre cualquier grupo de elementos sin conocer sus clases concretas.
La operacion 'accept' dirige una llamada a la operacion adecuada del objeto visitante.
*/
class VisitorApplication {
  public static main(): void {
    const shapes: MyShape[] = [new MyDot(10, 20), new MyCircle(30, 40, 50)];

    const exportVisitor = new XMLExportVisitor();

    for (const shape of shapes) {
      shape.accept(exportVisitor);
    }
  }
}

VisitorApplication.main();

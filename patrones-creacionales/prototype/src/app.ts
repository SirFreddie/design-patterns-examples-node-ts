// Prototipo base.
abstract class Shape {
  x?: number;
  y?: number;
  color?: string;

  //  El constructod prototipo. Un nuevo objeto se inicializa con valores del objeto original.
  constructor(source?: Shape) {
    this.x = source?.x;
    this.y = source?.y;
    this.color = source?.color;
  }

  //  El método clonar. Crea un objeto nuevo copiando los valores del objeto original.
  abstract clone(): Shape;
}

/*
Prototipo concreto. Implementa el método clonar. Crea un objeto nuevo copiando los valores del objeto original.
*/
class Rectangle extends Shape {
  width?: number;
  height?: number;

  constructor(source?: Rectangle) {
    // Para copiar campos privados, se debe llamar al constructor de la clase base.
    super(source);
    this.width = source?.width;
    this.height = source?.height;
  }

  clone(): Rectangle {
    return new Rectangle(this);
  }
}

class Circle extends Shape {
  radius?: number;

  constructor(source?: Circle) {
    super(source);
    this.radius = source?.radius;
  }

  clone(): Circle {
    return new Circle(this);
  }
}

class Application {
  shapes: Shape[] = [];

  constructor() {
    const circle: Circle = new Circle();
    circle.x = 10;
    circle.y = 10;
    circle.radius = 20;
    this.shapes.push(circle);

    const anotherCircle: Circle = circle.clone();
    this.shapes.push(anotherCircle);

    const rectangle: Rectangle = new Rectangle();
    rectangle.width = 10;
    rectangle.height = 20;
    this.shapes.push(rectangle);
  }

  main() {
    // Prototype es genial porque nos permite clonar objetos sin acoplar el código a sus clases concretas.
    const shapesCopy: Shape[] = [];

    /*
    Por ejemplo, no conocemos los elementos exactos de la matriz shapes, pero podemos clonarlos sin problemas.
    Esto es, gracias al polimosfismo y al método clone que se implementa en cada clase concreta.
    Por eso obtenemos una copia exacta de cada objeto.
    */
    this.shapes.forEach((shape: Shape, index: number) => {
      shapesCopy.push(shape.clone());
    });

    console.log("Clones: ", shapesCopy);
  }
}

const app = new Application();
app.main();

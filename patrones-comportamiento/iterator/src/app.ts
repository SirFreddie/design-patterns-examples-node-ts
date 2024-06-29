// La interfaz comun a todos los iteradores.
interface MyIterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

// Declara uno o varios metodos para obtener iteradores compatibles con la coleccion.
// El tipo de retorno de los metodos debe declararse como interfaz iteradora de forma que las colecciones
// concretas puedan devolver varios tipos de iteradores.
interface MyIterableCollection<T> {
  createIterator(): MyIterator<T>;
  createReverseIterator(): MyIterator<T>;
  createEvenIterator(): MyIterator<T>;
  createOddIterator(): MyIterator<T>;
}

// La clase iteradora concreta.
// Implementa algoritmos especificos para recorrer una coleccion.
class ConcreteIterator<T> implements MyIterator<T> {
  private collection: T[];
  private position: number = 0;

  constructor(collection: T[]) {
    this.collection = collection;
  }

  // Cada clase iteradora concreta tiene su propia implementación de los métodos de la interfaz comun.
  public next(): T | null {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

/*
Las colecciones concretas devuelven nuevas intancias de iteradores concretos.
El resto del codigo de la coleccion debe estar en esta clase.
*/
class ConcreteCollection<T> implements MyIterableCollection<T> {
  private collection: T[] = [];

  public createIterator(): MyIterator<T> {
    return new ConcreteIterator(this.collection);
  }

  public createReverseIterator(): MyIterator<T> {
    return new ConcreteIterator(this.collection.reverse());
  }

  public createEvenIterator(): MyIterator<T> {
    return new ConcreteIterator(this.collection.filter((_, i) => i % 2 === 0));
  }

  public createOddIterator(): MyIterator<T> {
    return new ConcreteIterator(this.collection.filter((_, i) => i % 2 !== 0));
  }

  public addItem(item: T): void {
    this.collection.push(item);
  }
}

// El cliente trabaja con cualquier tipo de colección o iterador concreto.
const collection = new ConcreteCollection<number>();
collection.addItem(0);
collection.addItem(1);
collection.addItem(2);
collection.addItem(3);
collection.addItem(4);
collection.addItem(5);

const iterator = collection.createIterator();
console.log("Straight traversal:");
while (iterator.hasNext()) {
  console.log(iterator.next());
}

const reverseIterator = collection.createReverseIterator();
console.log("Reverse traversal:");
while (reverseIterator.hasNext()) {
  console.log(reverseIterator.next());
}

const evenIterator = collection.createEvenIterator();
console.log("Even traversal:");
while (evenIterator.hasNext()) {
  console.log(evenIterator.next());
}

const oddIterator = collection.createOddIterator();
console.log("Odd traversal:");
while (oddIterator.hasNext()) {
  console.log(oddIterator.next());
}

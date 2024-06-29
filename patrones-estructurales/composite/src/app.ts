// La interfaz componente declara operaciones comunes para objetos simples y complejos de una composicion.
interface Component {
  operation(): string;
}

/*
La clase hoja representa los objetos finales de una composicion. Una hoja no puede tener subobjetos.
Normalmente, es la clase hoja la que hace el trabajo real,
mientras que las clases compuestas solo delegan a sus subcomponentes.
Todas las clases de componente pueden extender otros componentes.
*/
class Product implements Component {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  operation(): string {
    return this.name;
  }
}

/*
La clase compuesta representa los objetos complejos de una composicion. 
Una composicion puede contener tanto hojas como otras composiciones.
Normalemnte, las clases compuestas delegan la mayor parte del trabajo a sus subcomponentes,
*/
class CompoundBox implements Component {
  protected children: Component[] = [];

  // Un objeto compuesto puede agregar o eliminar otros componentes (tanto simples como complejos) a si mismo.
  add(component: Component): void {
    this.children.push(component);
  }

  remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
  }

  getChildren(): Component[] {
    return this.children;
  }

  /*
  Un compuesto ejecuta su logica primaria de una forma particular.
  Recorre recursivamente todos sus hijos, recopilando y recapitulando los resultados.
  Debido a que los hijos del compuesto pasan esas llamadas a sus propios hijos y asi sucesivamente,
  se recorre todo el arbol de objetos como resultado.
  */
  operation(): string {
    return this.children.map((child) => child.operation()).join(",");
  }
}

// El codigo cliente trabaja con todos los componentes a traves de su interfaz base.
// De esta forma el codigo cliente puede soportar componentes de hojas simples asi como compuestos complejos.
class Application {
  private bigBox: CompoundBox;

  constructor() {
    this.bigBox = new CompoundBox();
  }

  loadBigBox(): void {
    const product1 = new Product("Martillo");
    const product2 = new Product("Telefono");
    const product3 = new Product("Auricular");
    const product4 = new Product("Cargador");
    const product5 = new Product("Recibo");

    const smallBox1 = new CompoundBox();
    smallBox1.add(product1);

    const mediumBox1 = new CompoundBox();
    const smallBox2 = new CompoundBox();
    const smallBox3 = new CompoundBox();
    smallBox2.add(product2);
    smallBox2.add(product3);
    smallBox3.add(product4);
    mediumBox1.add(smallBox2);
    mediumBox1.add(smallBox3);

    this.bigBox.add(smallBox1);
    this.bigBox.add(mediumBox1);
    this.bigBox.add(product5);
  }

  operation(): string {
    return this.bigBox.operation();
  }
}

const app = new Application();
app.loadBigBox();
console.log("Productos en el paquete: ", app.operation());

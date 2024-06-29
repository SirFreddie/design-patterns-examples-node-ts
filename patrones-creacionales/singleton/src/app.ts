// El metodo get instance es el encargado de crear la instancia de la clase Singleton si no existe,
// de lo contrario retorna la instancia ya creada.
class Singleton {
  // El campo para almacenar la instancia de la clase Singleton debe ser privado y estatico.
  private static _instance: Singleton;

  // El constructor de la clase debe ser privado para evitar que se pueda instanciar la clase desde fuera.
  private constructor() {
    // Es posible tener un constructor vacio o con parametros de inicializacion.
  }

  // EL metodo estatico que se encarga de crear la instancia de la clase Singleton si no existe,
  // de lo contrario retorna la instancia ya creada.
  public static get instance(): Singleton {
    if (!Singleton._instance) {
      Singleton._instance = new Singleton();
    }

    return Singleton._instance;
  }

  // Agregar metodos y propiedades de la logica de negocio.
}

const singleton1 = Singleton.instance;
const singleton2 = Singleton.instance;
console.log(singleton1 === singleton2);

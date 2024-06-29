// La interfaz de componente declara operaciones comunes que los decoradores pueden alterar.
interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

// Los componentes concretos proporcionan implementaciones predeterminadas de las operaciones.
// En un programa puede haber muchas variaciones de estas clases.
class FileDataSource implements DataSource {
  public fileName: string;
  private data: string = "";

  constructor(filename: string) {
    this.fileName = filename;
  }

  writeData(data: string): void {
    this.data = data;
  }

  readData(): string {
    return this.data;
  }
}

/*
La clase decoradora base sigue la misma interfaz que otros componentes. 
El principal propósito de esta clase es definir la interfaz de envoltura para todos los decoradores concretos.
La implementación predeterminada de la clase decoradora es simplemente reenviar el trabajo al objeto envuelto.
*/
class DataSourceDecorator implements DataSource {
  protected wrapee: DataSource;

  constructor(source: DataSource) {
    this.wrapee = source;
  }

  // La decoradora base simplemente delega todo el trabajo al componente envuelto.
  // En los decoradores concretos, se pueden agregar comportamientos adicionales.
  writeData(data: string): void {
    this.wrapee.writeData(data);
  }

  // Los decoradores concretos pueden invocar la implementacion padre
  // de la operacion en lugar de invocar directamente al objeto envuelto.
  // Esta solucion simplifica la extension de las clases decoradoras.
  readData(): string {
    return this.wrapee.readData();
  }
}

/*
Los decoradores concretos deben invocar metodos en el objeto envuelto, 
pero tambien pueden agregar algo de su parte al resultado.
Los decoradores pueden ejecutar el comportamiento agregado antes o despues de la llamada al objeto envuelto.
*/
class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    // 1. Obtiene datos del metodo readData del objeto envuelto.
    const encryptedData = this.encrypt(data);
    console.log("Encrypt: ", data, " -> ", encryptedData);
    // 2. Pasa los datos encriptados al metodo writeData del objeto envuelto.
    this.wrapee.writeData(encryptedData);
  }

  readData(): string {
    // 1. Obtiene datos del metodo writeData del objeto envuelto.
    const encryptedData = this.wrapee.readData();
    // 2. Intenta desencriptar los datos.
    const decryptedData = this.decrypt(encryptedData);
    console.log("Decrypt: ", encryptedData, " -> ", decryptedData);
    // 3. Devuelve los datos desencriptados.
    return decryptedData;
  }

  private encrypt(data: string): string {
    return data.split("").reverse().join("");
  }

  private decrypt(data: string): string {
    return data.split("").reverse().join("");
  }
}

// Puedes envolver objetos en varias capas de decoradores.
class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    // 1. Comprime los datos antes de pasarlos al metodo writeData del objeto envuelto.
    const compressedData = this.compress(data);
    console.log("Compress: ", data, " -> ", compressedData);
    // 2. Pasa los datos comprimidos al metodo writeData del objeto envuelto.
    this.wrapee.writeData(compressedData);
  }

  readData(): string {
    // 1. Obtiene datos del metodo writeData del objeto envuelto.
    const compressedData = this.wrapee.readData();
    // 2. Descomprime los datos.
    const decompressedData = this.decompress(compressedData);
    console.log("Decompress: ", compressedData, " -> ", decompressedData);
    // 3. Devuelve los datos descomprimidos.
    return decompressedData;
  }

  private compress(data: string): string {
    return data.substring(0, 5);
  }

  private decompress(data: string): string {
    return data + ".decompressed";
  }
}

/*
Los objetos DataManager no conocen ni se preocupan por las especificaciones de los datos.
Trabajan con una fuente de opciones preconfigurada recibida de la clase ApplicationConfigurator. 
*/
class DataManager {
  private source: DataSource;

  constructor(source: DataSource) {
    this.source = source;
  }

  loadData(): string {
    console.log("Loading data...");
    return this.source.readData();
  }

  saveData(data: string): void {
    console.log("Saving data...");
    this.source.writeData(data);
  }
}

/*
La aplicacion puede montar distintas pilas de decoradores durante el tiempo de ejecucion,
dependiendo de la configuracion actual del sistema o del entorno.
*/
class ApplicationConfigurator {
  private enabledEncryption: boolean;
  private enabledCompression: boolean;

  constructor(enabledEncryption: boolean, enabledCompression: boolean) {
    this.enabledEncryption = enabledEncryption;
    this.enabledCompression = enabledCompression;
  }

  main(): void {
    let source: DataSource = new FileDataSource("somefile.dat");

    if (this.enabledEncryption) {
      source = new EncryptionDecorator(source);
    }
    if (this.enabledCompression) {
      source = new CompressionDecorator(source);
    }

    const logger = new DataManager(source);
    logger.saveData("datasupersecret");
    const data = logger.loadData();
    console.log("DATA: ", data);
  }
}

const app = new ApplicationConfigurator(true, true);
app.main();

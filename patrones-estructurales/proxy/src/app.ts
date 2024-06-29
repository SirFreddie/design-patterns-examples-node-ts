// La interfaz de un servicio remoto.
interface Subject {
  request(): void;
}

/*
La implementacion concreta de un conector del servivicio remoto.
Loas metodos de esta clase son los que se ejecutan en el servidor remoto.
*/
class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling request.");
  }
}

/*
El proxy actua como un intermediario entre el cliente y el servidor.
El proxy controla el acceso al servidor y puede realizar tareas adicionales
*/
class MySubjectProxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access prior to firing a real request.");
    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}

/*
La clase GUI, que solia trabajar con el objeto del servidor directamente con un objeto de servicio,
permanece sin cambios siempre y cuando trabaje con el objeto de servicio a traves de una interfaz
Podemos pasar sin riesgo un proxy en lugar de un objeto real del servidor ya que ambos implementan la misma interfaz.
*/
class SubjectManager {
  protected service: Subject;

  constructor(service: Subject) {
    this.service = service;
  }

  public doSomething(): void {
    this.service.request();
  }
}

// La aplicacion puede configurar proxies sobre la marcha.
class ProxyApplication {
  public main(): void {
    const aSubject = new RealSubject();
    const aSubjectProxy = new MySubjectProxy(aSubject);
    const manager = new SubjectManager(aSubjectProxy);

    manager.doSomething();
  }
}

const proxyApp = new ProxyApplication();
proxyApp.main();

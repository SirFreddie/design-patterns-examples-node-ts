interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

class BaseHandler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class ConcreteHandler1 extends BaseHandler {
  public handle(request: string): string | null {
    if (request === "request1") {
      return `Handled by ConcreteHandler1`;
    }
    return super.handle(request);
  }
}

class ConcreteHandler2 extends BaseHandler {
  public handle(request: string): string | null {
    if (request === "request2") {
      return `Handled by ConcreteHandler2`;
    }
    return super.handle(request);
  }
}

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
handler1.setNext(handler2);

console.log(handler1.handle("request1"));
console.log(handler1.handle("request2"));

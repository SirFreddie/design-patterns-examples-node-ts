/*
La "abstraccion" define la interfaz para la parte de "control" de las dos jerarquias de clase.
Mantiene una referencia a un objeto de la jerarquia de implementacion y delega todo el trabajo real a este objeto.
*/
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown() {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp() {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown() {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp() {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

// Puedes extender clases de la jerarquia de abstraccion independientemente de las clases de dispositivo.
class AdvancedRemoteControl extends RemoteControl {
  constructor(device: Device) {
    super(device);
  }

  mute() {
    this.device.setVolume(0);
  }
}

/*
La interfaz de "implementacion" declara metodos comunes a todas las clases concretas de la implementacion.
No tiene por que coincidir con la interfaz de la abstraccion. De hecho, las dos interfaces pueden ser completamente diferentes.
Normalmente, la interfaz de implementacion unicamente proporciona solo operaciones primitivas, 
mientras que la abstraccion define operaciones de nivel mas alto basadas en esas primitivas.
*/
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

// Todos los dispositivos siguen la misma interfaz.
class Tv implements Device {
  private power: boolean = false;
  private volume: number = 50;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.power;
  }
  enable(): void {
    this.power = true;
  }
  disable(): void {
    this.power = false;
  }
  getVolume(): number {
    return this.volume;
  }
  setVolume(percent: number): void {
    this.volume = percent;
  }
  getChannel(): number {
    return this.channel;
  }
  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class Radio implements Device {
  private power: boolean = false;
  private volume: number = 50;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.power;
  }
  enable(): void {
    this.power = true;
  }
  disable(): void {
    this.power = false;
  }
  getVolume(): number {
    return this.volume;
  }
  setVolume(percent: number): void {
    this.volume = percent;
  }
  getChannel(): number {
    return this.channel;
  }
  setChannel(channel: number): void {
    this.channel = channel;
  }
}

// Codigo cliente.
const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePower();
console.log("TV Encendida?: ", tv.isEnabled());

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.mute();
console.log("Volumen de la radio: ", radio.getVolume());

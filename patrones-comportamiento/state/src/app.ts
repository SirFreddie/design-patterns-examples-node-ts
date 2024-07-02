/*
La clase AudioPlayer es la clase Contexto, la cual tiene una referencia a la clase State.
*/
class AudioPlayer {
  private state: State;
  public playing: boolean = false;

  constructor() {
    this.state = new PlayerReadyState(this);
  }

  public setState(state: State) {
    this.state = state;
  }

  public clickPlay() {
    this.state.clickPlay();
  }

  public clickLock() {
    this.state.clickLock();
  }
}

/*
La clase estado base declara metodos que todos los estados concretos deben implementar, y tambien proporciona
una referencia al objeto contexto asociado, para poder cambiar el estado del contexto.
Los estados pueden utilizar la referencia inversa para cambiar el contexto a otro estado.
*/
abstract class State {
  protected player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  public abstract clickPlay(): void;
  public abstract clickLock(): void;
}

// Los estados concretos implementan varios comportamientos asociados a un estado del contexto.
class PlayerLockedState extends State {
  public clickPlay() {
    console.log("[LOCKED] El estado esta bloqueado");
  }

  // Cuando desbloqueas a un jugador bloqueado, puede asumi uno de dos estados.
  public clickLock() {
    if (this.player.playing) {
      console.log("[LOCKED] Bloqueando...");
      this.player.setState(new PlayerLockedState(this.player));
    } else {
      console.log("[LOCKED] Desbloqueando...");
      this.player.setState(new PlayerReadyState(this.player));
    }
  }
}

// Tambien pueden disparar transiciones de estado en el contexto.
class PlayerReadyState extends State {
  public clickPlay() {
    console.log("[READY] Reproduciendo...");
    this.player.playing = true;
    this.player.setState(new PlayerPlayingState(this.player));
  }

  public clickLock() {
    console.log("[READY] Bloqueando...");
    this.player.setState(new PlayerLockedState(this.player));
  }
}

class PlayerPlayingState extends State {
  public clickPlay() {
    console.log("[PLAYING] Pausando...");
    this.player.playing = false;
    this.player.setState(new PlayerReadyState(this.player));
  }

  public clickLock() {
    console.log("[PLAYING] Bloqueando...");
    this.player.setState(new PlayerLockedState(this.player));
  }
}

// Uso
const player = new AudioPlayer();
player.clickPlay();
player.clickLock();
player.clickLock();

export type StreamState = 'default' | 'loading' | 'active' | 'error';

/**
 * Класс управления потоком.
 */
export class StreamController {
  protected state: StreamState = 'default';
  public stream: MediaStream | null = null;
  protected constraints: MediaStreamConstraints = {};

  constructor(constraints?: MediaStreamConstraints) {
    if (constraints) {
      this.constraints = constraints;
    }
  }

  /**
   * Метод который обновляет состояние потока.
   *
   * @param state состояние потока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает состояние потока: 'default' | 'loading' | 'active' | 'error'.
   */
  protected updateState(state: StreamState, callback?: (state: StreamState) => void) {
    this.state = state;

    if (callback) {
      callback(this.state);
    }
  }

  /**
   * Метод который получает поток.
   *
   * @param callback функция которая возвращает состояние потока: 'default' | 'loading' | 'active' | 'error'.
   * @returns возвращает поток.
   */
  public async getStream(callback?: (state: StreamState) => void) {
    this.closeStream();
    this.updateState('loading', callback);

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.updateState('active', callback);
    } catch (error) {
      this.updateState('error', callback);
    }

    return this.stream;
  }

  /**
   * Метод который закрывает поток.
   *
   * @param callback функция которая возвращает состояние потока: 'default' | 'loading' | 'active' | 'error'.
   */
  public closeStream(callback?: (state: StreamState) => void) {
    if (this.stream) {
      this.stream.getTracks().forEach((value) => value.stop());
      this.stream = null;
      this.updateState('default', callback);
    }
  }
}

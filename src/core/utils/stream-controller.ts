export type StreamState = 'default' | 'loading' | 'active' | 'error';

/**
 * Класс управления потоком.
 */
export class StreamController {
  protected state: StreamState = 'default';
  protected stream: MediaStream | null = null;
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
   * @param callback функция которая возвращает поток и состояние потока.
   */
  protected updateState(
    state: StreamState,
    callback?: (params: { stream: MediaStream | null; state: StreamState }) => void
  ) {
    this.state = state;

    if (callback) {
      callback({ stream: this.stream, state: this.state });
    }
  }

  /**
   * Метод который получает разрешение на получение потока.
   */
  public async getPermission(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ((await navigator.permissions.query({ name: 'microphone' })).state === 'granted') {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ((await navigator.permissions.query({ name: 'camera' })).state === 'granted') {
      return;
    }

    try {
      await this.getStream();
    } catch (error) {
      console.error(error);
    }

    this.closeStream();
  }

  /**
   * Метод который получает поток.
   *
   * @param callback функция которая возвращает поток и состояние потока.
   * @returns возвращает поток.
   */
  public async getStream(callback?: (params: { stream: MediaStream | null; state: StreamState }) => void) {
    this.updateState('loading', callback);

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.updateState('active', callback);
    } catch (error) {
      this.updateState('error', callback);

      // TODO: Можно добавить код ошибки и написать метод возвращающий текст ошибки
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }

    return this.stream;
  }

  /**
   * Метод который закрывает поток.
   *
   * @param callback функция которая возвращает поток и состояние потока.
   */
  public closeStream(callback?: (params: { stream: MediaStream | null; state: StreamState }) => void) {
    if (this.stream) {
      this.stream.getTracks().forEach((value) => value.stop());
      this.stream = null;
      this.updateState('default', callback);
    }
  }
}

import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления видеопотоком.
 */
export class VideoStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { video: true };
  protected logs: boolean = false;

  constructor(logs?: boolean) {
    super();

    if (typeof logs === 'boolean') {
      this.logs = logs;
    }
  }

  /**
   * Метод который обновляет состояние видеопотока.
   *
   * @param state состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  protected override updateState(state: StreamState, callback?: ((state: StreamState) => void) | undefined): void {
    super.updateState(state, callback);
  }

  /**
   * Метод который получает видеопоток.
   *
   * @param callback функция которая возвращает состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   * @returns возвращает видеопоток.
   */
  public override async getStream(callback?: ((state: StreamState) => void) | undefined): Promise<MediaStream | null> {
    if (this.stream || this.state === 'loading') {
      this.logs && console.log('LOGS: Видеопоток уже получен.');

      return this.stream;
    }

    try {
      this.stream = await super.getStream(callback);

      this.logs && console.log('LOGS: Видеопоток успешно получен.');
    } catch (error) {
      if (error instanceof Error) {
        this.logs && console.log('LOGS: Ошибка при получении видеопотока. Причина: ' + error.message + '.');
      }

      return null;
    }

    return this.stream;
  }

  /**
   * Метод который закрывает видеопоток.
   *
   * @param callback функция которая возвращает состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  public override closeStream(callback?: ((state: StreamState) => void) | undefined): void {
    if (this.stream === null) {
      this.logs && console.log('LOGS: Видеопоток уже закрыт.');
    } else {
      super.closeStream(callback);

      this.logs && console.log('LOGS: Видеопоток успешно закрыт.');
    }
  }
}

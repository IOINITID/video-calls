import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления видеопотоком.
 */
export class VideoStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { video: true };
  protected logs: boolean = false;

  constructor(constraints?: MediaStreamConstraints);
  constructor(logs?: boolean);
  constructor(constraints?: MediaStreamConstraints, logs?: boolean);
  constructor(constraintsOrLogs?: MediaStreamConstraints | boolean) {
    super();

    if (typeof constraintsOrLogs === 'object') {
      this.constraints = constraintsOrLogs;
    }

    if (typeof constraintsOrLogs === 'boolean') {
      this.logs = constraintsOrLogs;
    }
  }

  /**
   * Метод который обновляет состояние видеопотока.
   *
   * @param state состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает видеопоток и состояние видеопотока.
   */
  protected override updateState(
    state: StreamState,
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    super.updateState(state, callback);
  }

  /**
   * Метод который получает разрешение на получение видеопотока.
   */
  public override async requestPermission(): Promise<void> {
    await super.requestPermission();
  }

  /**
   * Метод который получает видеопоток.
   *
   * @param callback функция которая возвращает видеопоток и состояние видеопотока.
   * @returns возвращает видеопоток.
   */
  public override async getStream(
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): Promise<MediaStream | null> {
    if (this.stream || this.state === 'loading') {
      this.logs && console.log('LOGS: Видеопоток уже получен.');

      return this.stream;
    }

    try {
      this.stream = await super.getStream(callback);

      this.logs && console.log('LOGS: Видеопоток успешно получен.');
    } catch (error) {
      if (error instanceof Error) {
        this.logs && console.error('LOGS: Ошибка при получении видеопотока. Причина: ' + error.message + '.');
      }

      return null;
    }

    return this.stream;
  }

  /**
   * Метод который закрывает видеопоток.
   *
   * @param callback функция которая возвращает видеопоток и состояние видеопотока.
   */
  public override closeStream(
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    if (this.stream === null) {
      this.logs && console.log('LOGS: Видеопоток уже закрыт.');
    } else {
      super.closeStream(callback);

      this.logs && console.log('LOGS: Видеопоток успешно закрыт.');
    }
  }
}

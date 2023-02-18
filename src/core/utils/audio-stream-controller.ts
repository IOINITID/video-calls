import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления аудиопотоком.
 */
export class AudioStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { audio: true };
  protected logs: boolean = false;

  constructor(constraints?: MediaStreamConstraints);
  constructor(logs?: boolean);
  constructor(constraints?: MediaStreamConstraints, logs?: boolean);
  constructor(constraintsOrLogs?: MediaStreamConstraints | boolean, logs?: boolean) {
    super();

    if (typeof constraintsOrLogs === 'object') {
      this.constraints = constraintsOrLogs;
    }

    if (typeof constraintsOrLogs === 'boolean') {
      this.logs = constraintsOrLogs;
    }

    if (logs) {
      this.logs = logs;
    }
  }

  /**
   * Метод который обновляет состояние аудиопотока.
   *
   * @param state состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  protected override updateState(state: StreamState, callback?: ((state: StreamState) => void) | undefined): void {
    super.updateState(state, callback);
  }

  /**
   * Метод который получает аудиопоток.
   *
   * @param callback функция которая возвращает состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   * @returns возвращает аудиопоток.
   */
  public override async getStream(callback?: ((state: StreamState) => void) | undefined): Promise<MediaStream | null> {
    if (this.stream || this.state === 'loading') {
      this.logs && console.log('LOGS: Аудиопоток уже получен.');

      return this.stream;
    }

    try {
      this.stream = await super.getStream(callback);

      this.logs && console.log('LOGS: Аудиопоток успешно получен.');
    } catch (error) {
      if (error instanceof Error) {
        this.logs && console.error('LOGS: Ошибка при получении аудиопотока. Причина: ' + error.message + '.');
      }
    }

    return this.stream;
  }

  /**
   * Метод который закрывает аудиопоток.
   *
   * @param callback функция которая возвращает состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  public override closeStream(callback?: ((state: StreamState) => void) | undefined): void {
    if (this.stream === null) {
      this.logs && console.log('LOGS: Аудиопоток уже закрыт.');
    } else {
      super.closeStream(callback);

      this.logs && console.log('LOGS: Аудиопоток успешно закрыт.');
    }
  }
}

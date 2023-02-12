import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления видеопотоком.
 */
export class VideoStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { video: true };

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
  public override getStream(callback?: ((state: StreamState) => void) | undefined): Promise<MediaStream | null> {
    return super.getStream(callback);
  }

  /**
   * Метод который закрывает видеопоток.
   *
   * @param callback функция которая возвращает состояние видеопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  public override closeStream(callback?: ((state: StreamState) => void) | undefined): void {
    super.closeStream(callback);
  }
}

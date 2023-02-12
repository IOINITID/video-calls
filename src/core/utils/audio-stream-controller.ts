import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления аудиопотоком.
 */
export class AudioStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { audio: true };

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
  public override getStream(callback?: ((state: StreamState) => void) | undefined): Promise<MediaStream | null> {
    return super.getStream(callback);
  }

  /**
   * Метод который закрывает аудиопоток.
   *
   * @param callback функция которая возвращает состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   */
  public override closeStream(callback?: ((state: StreamState) => void) | undefined): void {
    super.closeStream(callback);
  }
}

import { StreamController, StreamState } from './stream-controller';

/**
 * Класс управления аудиопотоком.
 */
export class AudioStreamController extends StreamController {
  protected override constraints: MediaStreamConstraints = { audio: true };
  protected logs: boolean = false;
  private animationFrame: number | null = null;

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
   * Метод который обновляет состояние аудиопотока.
   *
   * @param state состояние аудиопотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает аудиопоток и состояние аудиопотока.
   */
  protected override updateState(
    state: StreamState,
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    super.updateState(state, callback);
  }

  public closeVisualizer() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public async getVisualizer(callback?: (data: number[]) => void) {
    if (this.stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 128;
      analyser.minDecibels = -85;
      analyser.maxDecibels = 150;

      const source = audioContext.createMediaStreamSource(this.stream);

      source.connect(analyser);
      source.connect(audioContext.destination);

      const data = new Uint8Array(analyser.frequencyBinCount);

      const animationLoop = () => {
        this.animationFrame = requestAnimationFrame(animationLoop);

        analyser.getByteFrequencyData(data);

        if (callback) {
          callback(Array.from(data));
        }
      };

      animationLoop();
    }
  }

  /**
   * Метод который получает разрешение на получение аудиопотока.
   */
  public override async requestPermission(): Promise<void> {
    await super.requestPermission();
  }

  /**
   * Метод который получает аудиопоток.
   *
   * @param callback функция которая возвращает аудиопоток и состояние аудиопотока.
   * @returns возвращает аудиопоток.
   */
  public override async getStream(
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): Promise<MediaStream | null> {
    if (this.stream) {
      this.logs && console.log('LOGS: Аудиопоток уже получен.');

      return this.stream;
    }

    if (this.state === 'loading') {
      this.logs && console.log('LOGS: Запрос на получение аудиопотока выполняется.');

      return this.stream;
    }

    try {
      this.stream = await super.getStream(callback);

      this.logs && console.log('LOGS: Аудиопоток успешно получен.');
    } catch (error) {
      if (error instanceof DOMException) {
        this.logs && console.error('LOGS: Ошибка при получении аудиопотока. Причина: ' + error.message + '.');
        return null;
      }

      if (error instanceof Error) {
        this.logs && console.error('LOGS: Ошибка при получении аудиопотока. Причина: ' + error.message + '.');
        return null;
      }
    }

    return this.stream;
  }

  /**
   * Метод который закрывает аудиопоток.
   *
   * @param callback функция которая возвращает аудиопоток и состояние аудиопотока.
   */
  public override closeStream(
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    if (this.stream === null) {
      this.logs && console.log('LOGS: Аудиопоток уже закрыт.');
    } else {
      super.closeStream(callback);

      this.closeVisualizer();

      this.logs && console.log('LOGS: Аудиопоток успешно закрыт.');
    }
  }
}

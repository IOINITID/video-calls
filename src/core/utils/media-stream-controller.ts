import { AudioStreamController } from './audio-stream-controller';
import { StreamController, StreamState } from './stream-controller';
import { VideoStreamController } from './video-stream-controller';

/**
 * Класс управления медиапотоком.
 */
export class MediaStreamController extends StreamController {
  public audioStreamController: AudioStreamController;
  public videoStreamController: VideoStreamController;
  private audioStreamState: StreamState = 'default';
  private videoStreamState: StreamState = 'default';

  constructor(audioStreamController: AudioStreamController, videoStreamController: VideoStreamController) {
    super();
    this.audioStreamController = audioStreamController;
    this.videoStreamController = videoStreamController;
  }

  /**
   * Метод который обновляет состояние медиапотока.
   *
   * @param state состояние медиапотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает медиапоток и состояние медиапотока.
   */
  protected override updateState(
    state: StreamState,
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    super.updateState(state, callback);
  }

  /**
   * Метод который получает медиапоток.
   *
   * @param callback функция которая возвращает медиапоток и состояние медиапотока.
   * @returns возвращает медиапоток.
   */
  public override async getStream(
    callback?: (params: { stream: MediaStream | null; state: StreamState }) => void
  ): Promise<MediaStream | null> {
    if (this.stream || this.state === 'loading') {
      console.log('LOGS: Медиапоток уже получен.');

      return this.stream;
    }

    this.updateState('loading', callback);

    this.stream = new MediaStream();

    const audioStream = await this.audioStreamController.getStream((params) => {
      this.audioStreamState = params.state;
    });

    const videoStream = await this.videoStreamController.getStream((params) => {
      this.videoStreamState = params.state;
    });

    if (audioStream) {
      const audioTrack = audioStream.getTracks()[0];

      this.stream.addTrack(audioTrack);
    }

    if (videoStream) {
      const videoTrack = videoStream.getTracks()[0];

      this.stream.addTrack(videoTrack);
    }

    if (this.audioStreamState === 'active' || this.videoStreamState === 'active') {
      this.updateState('active', callback);

      console.log('LOGS: Медиапоток успешно получен.');

      return this.stream;
    }

    this.stream = null;

    this.updateState('error', callback);

    console.error('LOGS: Ошибка при получении медиапотока. Причина: Нет аудио или видео потока.');

    return null;
  }

  /**
   * Метод который закрывает медипоток.
   *
   * @param callback функция которая возвращает медиапоток и состояние медиапотока.
   */
  public override closeStream(
    callback?: ((params: { stream: MediaStream | null; state: StreamState }) => void) | undefined
  ): void {
    if (this.stream === null) {
      console.log('LOGS: Медиапоток уже закрыт.');
    } else {
      super.closeStream(callback);
      this.audioStreamController.closeStream();
      this.videoStreamController.closeStream();

      console.log('LOGS: Медиапоток успешно закрыт.');
    }
  }
}

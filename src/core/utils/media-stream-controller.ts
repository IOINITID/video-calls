import { AudioStreamController } from './audio-stream-controller';
import { StreamController, StreamState } from './stream-controller';
import { VideoStreamController } from './video-stream-controller';

/**
 * Класс управления медиапотоком.
 */
export class MediaStreamController extends StreamController {
  public audioStreamController: AudioStreamController;
  public videoStreamController: VideoStreamController;

  constructor(audioStreamController: AudioStreamController, videoStreamController: VideoStreamController) {
    super();
    this.audioStreamController = audioStreamController;
    this.videoStreamController = videoStreamController;
  }

  /**
   * Метод который обновляет состояние медиапотока.
   *
   * @param state состояние медиапотока: 'default' | 'loading' | 'active' | 'error'.
   * @param callback функция которая возвращает состояние медиапотока: 'default' | 'loading' | 'active' | 'error'.
   */
  protected override updateState(state: StreamState, callback?: ((state: StreamState) => void) | undefined): void {
    super.updateState(state, callback);
  }

  /**
   * Метод который получает медиапоток.
   *
   * @param callback функция которая возвращает состояние медиапотока: 'default' | 'loading' | 'active' | 'error'.
   * @returns возвращает медиапоток.
   */
  public override async getStream(callback?: (state: StreamState) => void): Promise<MediaStream | null> {
    this.updateState('loading', callback);

    try {
      const audioStream = await this.audioStreamController.getStream();
      const videoStream = await this.videoStreamController.getStream();

      this.stream = new MediaStream();

      if (audioStream) {
        const audioTrack = audioStream.getTracks()[0];

        this.stream.addTrack(audioTrack);
      }

      if (videoStream) {
        const videoTrack = videoStream.getTracks()[0];

        this.stream.addTrack(videoTrack);
      }

      this.updateState('active', callback);
    } catch (error) {
      this.updateState('error', callback);
    }

    return this.stream;
  }

  /**
   * Метод который закрывает медипоток.
   *
   * @param callback функция которая возвращает состояние медиапотока: 'default' | 'loading' | 'active' | 'error'.
   */
  public override closeStream(callback?: ((state: StreamState) => void) | undefined): void {
    super.closeStream(callback);
  }
}

import { AudioService } from './audio';
import { VideoService } from './video';

export class StreamService {
  public audio: AudioService;
  public video: VideoService;

  constructor() {
    this.audio = new AudioService();
    this.video = new VideoService();
  }
}

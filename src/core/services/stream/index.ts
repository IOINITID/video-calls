import { Audio } from './classes/audio';
import { Video } from './classes/video';

export class Stream {
  public audio: Audio;
  public video: Video;

  constructor() {
    this.audio = new Audio();
    this.video = new Video();
  }
}

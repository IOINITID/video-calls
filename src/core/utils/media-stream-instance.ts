import { AudioStreamController } from './audio-stream-controller';
import { MediaStreamController } from './media-stream-controller';
import { VideoStreamController } from './video-stream-controller';

const audioStream = new AudioStreamController();
const videoStream = new VideoStreamController();

export const mediaStream = new MediaStreamController(audioStream, videoStream);

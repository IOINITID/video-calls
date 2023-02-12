import { AudioStreamController } from './audio-stream-controller';
import { MediaStreamController } from './media-stream-controller';
import { VideoStreamController } from './video-stream-controller';

const audioStream = new AudioStreamController(true);
const videoStream = new VideoStreamController(true);

export const mediaStream = new MediaStreamController(audioStream, videoStream);

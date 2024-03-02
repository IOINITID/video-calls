import { Devices } from '../devices';
import { Stream } from '../stream';

export class Media {
  public stream: Stream;
  public devices: Devices;

  constructor() {
    this.stream = new Stream();
    this.devices = new Devices();
  }
}

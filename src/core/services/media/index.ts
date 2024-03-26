import { DevicesService } from '../devices';
import { StreamService } from '../stream';

export class MediaService {
  public stream: StreamService;
  public devices: DevicesService;

  constructor() {
    this.stream = new StreamService();
    this.devices = new DevicesService();
  }
}

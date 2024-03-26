import { BaseService } from '../base';

export class VideoService extends BaseService {
  constructor() {
    super({ type: 'video' });
  }

  public override async get() {
    super.get({ video: true });
  }
}

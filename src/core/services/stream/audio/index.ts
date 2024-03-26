import { BaseService } from '../base';

export class AudioService extends BaseService {
  constructor() {
    super({ type: 'audio' });
  }

  public override async get() {
    super.get({ audio: true });
  }
}

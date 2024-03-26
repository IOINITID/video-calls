import { Base } from '../base';

export class Video extends Base {
  constructor() {
    super({ type: 'video' });
  }

  public override async get() {
    super.get({ video: true });
  }
}

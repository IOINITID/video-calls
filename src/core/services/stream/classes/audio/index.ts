import { Base } from '../base';

export class Audio extends Base {
  constructor() {
    super({ type: 'audio' });
  }

  public override async get() {
    super.get({ audio: true });
  }
}

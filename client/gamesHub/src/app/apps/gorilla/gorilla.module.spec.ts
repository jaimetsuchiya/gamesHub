import { GorillaModule } from './gorilla.module';

describe('GorillaModule', () => {
  let gorillaModule: GorillaModule;

  beforeEach(() => {
    gorillaModule = new GorillaModule();
  });

  it('should create an instance', () => {
    expect(gorillaModule).toBeTruthy();
  });
});

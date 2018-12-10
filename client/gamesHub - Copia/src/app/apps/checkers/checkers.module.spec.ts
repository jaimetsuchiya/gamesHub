import { CheckersModule } from './checkers.module';

describe('CheckersModule', () => {
  let checkersModule: CheckersModule;

  beforeEach(() => {
    checkersModule = new CheckersModule();
  });

  it('should create an instance', () => {
    expect(checkersModule).toBeTruthy();
  });
});

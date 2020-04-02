import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    const pipe = new CurrencyPipe();
    expect(pipe.transform(20)).toEqual('20$');
  });
});

import { FilterByPipe } from './filter-by.pipe';

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;

  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter the array based on the given index and value', () => {
    const items = [
      ['test1', 'test2'],
      ['test3', 'test4']
    ];
    expect(pipe.transform(items, 0, 'test1')).toEqual([['test1', 'test2']]);
    expect(pipe.transform(items, 1, 'test4')).toEqual([['test3', 'test4']]);
  });

  it('should handle case insensitive filtering', () => {
    const items = [
      ['Test1', 'test2'],
      ['test3', 'test4']
    ];
    expect(pipe.transform(items, 0, 'test1')).toEqual([['Test1', 'test2']]);
    expect(pipe.transform(items, 0, 'TeSt1')).toEqual([['Test1', 'test2']]);
  });

  it('should return all values if search value is undefined', () => {
    const items = [
      ['Test1', 'test2'],
      ['test3', 'test4']
    ];
    expect(pipe.transform(items, 0, undefined)).toEqual(items);
  });

  it('should return all values if no search value', () => {
    const items = [
      ['Test1', 'test2'],
      ['test3', 'test4']
    ];
    expect(pipe.transform(items, 0, '')).toEqual(items);
  });
});

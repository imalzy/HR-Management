import { GlobalStoreService } from './global-store.service';

describe('GlobalStoreService', () => {
  let service: GlobalStoreService;

  beforeEach(() => {
    service = new GlobalStoreService();
  });

  it('should update searchGlobal$ observable with the provided search string', () => {
    const testSearchString = 'test search';
    service.setGlobalSearch(testSearchString);

    service.searchGlobal$.subscribe((searchValue) => {
      expect(searchValue).toBe(testSearchString);
    });
  });
});
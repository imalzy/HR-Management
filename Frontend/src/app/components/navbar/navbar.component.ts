import { Component, Input, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalStoreService } from '../../services/global-store.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true }) title = '';
  globalStoreService = inject(GlobalStoreService);
  faSearch = faSearch;
  searchControl = new FormControl();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe((newValue) => {
        console.log(newValue);
        this.globalStoreService.setGlobalSearch(newValue);
      });
  }
}

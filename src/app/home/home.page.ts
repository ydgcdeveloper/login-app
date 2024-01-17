import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestroyComponent } from '../components/destroy/destroy.component';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { logout, logoutSuccess } from '../store/auth';
import { takeUntil } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { AuthState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage extends DestroyComponent implements OnInit, OnDestroy {
  
  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AuthState>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(logoutSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  logOut(){
    this.store.dispatch(logout());
  }
}

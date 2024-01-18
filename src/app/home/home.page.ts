import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestroyComponent } from '../components/destroy/destroy.component';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { logoutSuccess } from '../store/auth';
import { takeUntil } from 'rxjs';
import { IonAlert, IonButton, IonContent, IonHeader, IonImg, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonContent, IonTitle, IonButton, IonImg, IonToast, IonAlert],
})
export class HomePage extends DestroyComponent implements OnInit, OnDestroy {
  
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
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
    this.authService.confirmLogout();
  }
}

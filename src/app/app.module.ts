import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CtabuilderService} from './shared/ctabuilder.service';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {ReactiveFormsModule} from '@angular/forms';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

import { RunesListComponent } from './runes-list/runes-list.component';
import { RunesListItemComponent } from './runes-list-item/runes-list-item.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroesListItemComponent } from './heroes-list-item/heroes-list-item.component';
import { HeroDetailsCommentsComponent } from './hero-details-comments/hero-details-comments.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from './shared/message.service';
import { HeroBuilderComponent } from './hero-builder/hero-builder.component';
import { HeroBuilderRunesListItemComponent } from './hero-builder-runes-list-item/hero-builder-runes-list-item.component';
import { HeroBuilderAddedRunesComponent } from './hero-builder-added-runes/hero-builder-added-runes.component';
import { GetRuneIconPathPipe } from './shared/get-rune-icon-path.pipe';
import { GetStatIconPathPipe } from './shared/get-stat-icon-path.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeroDetailsComponent,
    RunesListComponent,
    RunesListItemComponent,
    HeroesListComponent,
    HeroesListItemComponent,
    HeroDetailsCommentsComponent,
    UserRegistrationComponent,
    HeroBuilderComponent,
    HeroBuilderRunesListItemComponent,
    HeroBuilderAddedRunesComponent,
    GetRuneIconPathPipe,
    GetStatIconPathPipe,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    CtabuilderService, MessageService,
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

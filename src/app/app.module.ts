import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { PlayComponent } from './play/play.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ReelSetComponent } from './reel-set/reel-set.component';
import { ReelComponent } from './reel/reel.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayComponent,
    ButtonsComponent,
    ReelSetComponent,
    ReelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

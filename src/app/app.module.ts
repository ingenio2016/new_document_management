import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

// Routes Import
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentsComponent } from './components/documents/documents.component';

// Providers/Services
import { DocumentService } from './providers/document.service';
import { SearchComponent } from './components/documents/search/search.component';
import { ListComponent } from './components/documents/list/list.component';
import { SearchBarComponent } from './components/documents/search-bar/search-bar.component';
import { EditComponent } from './components/documents/edit/edit.component';
import { OrderByPipe } from './pipes/order-by.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DocumentsComponent,
    SearchComponent,
    ListComponent,
    SearchBarComponent,
    EditComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    APP_ROUTING,
    FormsModule
  ],
  providers: [
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

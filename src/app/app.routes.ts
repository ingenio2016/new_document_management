import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DocumentsComponent } from './components/documents/documents.component';
// Child Components
import { ListComponent } from './components/documents/list/list.component';
import { SearchComponent } from './components/documents/search/search.component';
import { EditComponent } from './components/documents/edit/edit.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'documents',
    component : DocumentsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'search/:text', component: SearchComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'list'}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });

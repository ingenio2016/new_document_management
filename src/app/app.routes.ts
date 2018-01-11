import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './components/documents/documents.component';
// Child Components
import { ListComponent } from './components/documents/list/list.component';
import { SearchComponent } from './components/documents/search/search.component';
import { EditComponent } from './components/documents/edit/edit.component';


const APP_ROUTES: Routes = [
  { path: 'documents',
    component : DocumentsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'search/:text', component: SearchComponent },
      { path: 'edit', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'list'}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'documents'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });

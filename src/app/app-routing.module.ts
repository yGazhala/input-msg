import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoRootComponent } from './demo-root/demo-root.component';

const appRoutes: Routes = [
  {
    path: 'material',
    component: DemoRootComponent,
  },
  {
    path: 'custom',
    component: DemoRootComponent,
  },
  {
    path: '',
    redirectTo: 'material',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    // github pages hosting requires hash style
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


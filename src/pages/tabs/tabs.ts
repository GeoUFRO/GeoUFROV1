import { Component } from '@angular/core';

import { Favs } from '../favs/favs';
import { Usuario } from '../usuario/usuario';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Favs;
  tab3Root = Usuario;

  constructor() {

  }
}

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
/**
 * @customElement
 * @polymer
 */
class IngmockmochathonApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Welcome to [[pagetitle]]!</h2>
      <app-location route="{{route}}"></app-location>
      <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}"
          tail="{{subroute}}">
      </app-route>
      {{page}}
      <app-route
          route="{{subroute}}"
          pattern="/:id"
          data="{{subrouteData}}">
      </app-route>
      <ul>
        <li><a href="/overview">Overview</a></li>
        <li><a href="/analytics">Analytics</a></li>
      </ul>

      <iron-pages selected="[[page]]" attr-for-selected="name" selected-attribute="visible">
        <products-overview name="overview"></products-overview>
        <prodcut-details name="details" route={{subroute}}></prodcut-details>
        <product-analytics name="analytics"></product-analytics>
      </iron-pages>
    `;
  }
  static get properties() {
    return {
      pagetitle: {
        type: String,
        value: 'ING Hackthon'
      },
      page:{
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      }
    };
  }
  static get observers(){
    return ['_routeChanged(routeData.page)'];
  }
  _routeChanged(page){
    this.page = (page || ('overview'));
  }
  _pageChanged(newPage, oldpage){
   
    switch(newPage){
      case 'overview':
        import('./products-overview.js');
        break;
      case 'details':
        import('./product-details.js');
        break;
      case 'analytics':
        import('./product-analytics.js');
        break;  
      default:
        this.page =  'overview'; 
        
    }
  }
}

window.customElements.define('ingmockmochathon-app', IngmockmochathonApp);

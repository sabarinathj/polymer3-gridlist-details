import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-accordion/vaadin-accordion.js';

/**
 * @customElement
 * @polymer
 */
class productsOverview extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://localhost:3000/products";
        ajaxCall.generateRequest();
    }
    handleResponse(event){
        this.data = event.detail.response;
    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[pagetitle]]!</h2>

        <iron-ajax
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        <vaadin-accordion>
            <template is="dom-repeat"  items="{{data}}" as="product">
                <vaadin-accordion-panel theme="filled"> 
                    <div slot="summary">{{product.title}}</div>
                    <template is="dom-repeat" items="{{product.subproducts}}">
                        <div><a href="/details/[[product.id]]/[[item.sub_id]]">{{item.productName}}</a></div>
                    </template>  
                </vaadin-accordian-panel> 
            </template>
        </vaadin-accordion>    

    `;
  }
  static get properties() {
    return {
      pagetitle: {
        type: String,
        value: 'Product Overview Page'
      }
    };
  }
}

customElements.define('products-overview', productsOverview);

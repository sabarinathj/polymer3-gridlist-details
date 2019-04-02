import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ProductDetails extends PolymerElement{
    connectedCallback(){
        super.connectedCallback();
        
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://localhost:3000/productDetails/?id="+this.routeData.mainId;
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxCall.generateRequest();
        // let ajaxCallOther = this.$.ajax;
        // ajaxCallOther.url = "http://localhost:3000/productDetails/?id="+this.routeData.mainId;
        // this.requestType = 'selectedProduct';		
        // ajaxCallOther.generateRequest();    
        this.addEventListener('click', this._loadOtherProducts);
    }
    _loadOtherProducts(){
        let ajaxOtherProduct = this.$.ajax;
        ajaxOtherProduct.url = "http://localhost:3000/productDetails/?id="+this.routeData.mainId;
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxOtherProduct.generateRequest();
    }
    handleResponse(event, requestType){
        console.log(event);
        this.resData = event.detail.__data.response;
        this.selectedProducts = this.resData.filter((products) => {
            return products.sub_id == this.routeData.subId;
        });
        this.otherProducts = this.resData.filter((products) => {
            return products.sub_id != this.routeData.subId;
        });
        console.log("response data",this.resData);        
    }
    selectedProduct(event){
        console.log(event);
        return 
            for(let i = 0; i<this.resData.length; i++ ){
                if(this.resData[i].sub_id === this.routeData.subId){
                    return true;
                }
            }
    }
    otherProduct(){
        return this.resData.sub_id !== this.routeData.subId
    }
    static get template(){
        return html `
        <h2>Hello [[pagetitle]]!</h2>

        <app-route
            route="{{route}}"
            pattern="/:mainId/:subId"
            data="{{routeData}}">
        </app-route>
      
        {{routeData.mainId}} -- {{routeData.subId}}

        <iron-ajax
            auto
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        
        <table border=1>
            <tr>
                <td>Name</td>
                <td>Scheme Amount</td>
                <td>Scheme Started</td>
            </tr>
            <template is="dom-repeat" items=[[selectedProducts]]>
                <tr>
                    <template is="dom-repeat" items=[[item.details]]>
                        <td>{{item.name}}</td>
                        <td>{{item.scheme_acmount}}</td>
                        <td>{{item.scheme_started}}</td>
                    </template>
                    
                </td>
            </template>
        </table><br/>
        <h4>Other Products</h4>
            <ul>
                <template is="dom-repeat" items=[[otherProducts]] as="product">
                    <li>
                        <template is="dom-repeat" items=[[product.details]]>
                            <a href="/details/[[product.id]]/[[product.sub_id]]">{{item.name}}</a>
                        </template>
                    </li>
                </template>
            </ul>
        `;
    }
    static get properties() {
        return {
          pagetitle: {
            type: String,
            value: 'Product Details page'
          }
          
        };
    }
}
customElements.define('prodcut-details', ProductDetails);
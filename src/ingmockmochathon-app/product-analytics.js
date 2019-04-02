import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ProductAnalytics extends PolymerElement{
    connectedCallback(){
        super.connectedCallback();
        
    }
    ready(){
        super.ready();
        let ajaxCall = this.$.ajax;
        ajaxCall.url = "http://localhost:3000/trackers2";
        //ajaxCall.body = {"id": this.routeData.mainId, "sub_id": this.routeData.subId }
        ajaxCall.generateRequest();

                 
    }
    handleResponse(event){
        this.resData = event.detail.__data.response;

        
        this.resData.forEach((value, key) => {
            //console.log(element, index);
        });
        /*
        for (var i = 0; i < this.resData.length; i++) {
            if (this.resData[i] != current) {
                if (cnt > 0) {
                    document.write(current + ' comes --> ' + cnt + ' times<br>');
                }
                current = this.resData[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            document.write(current + ' comes --> ' + cnt + ' times');
        }
        */
        //var data = [2, 4, 8, 10];
        
        //var data = this.resData;
        var w = 300;
        var h = 300;
        
        var svg = d3.select(this.$.svgImage);
        var outerRadius = w / 2;
        var innerRadius = 0;
        var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

        var pie = d3.layout.pie()
        .value(function(d) {
            return d.count;
        });

        var color = d3.scale.category20();

        var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        var arcs = svg.selectAll("g.arc")
        .data(pie(this.resData))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

        arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.value;
        });
    }
    static get template(){
        return html `
        <h2> [[pagetitle]]!</h2>
        <iron-ajax
            auto
            id="ajax"
            handle-as="json"
            on-response="handleResponse"
            debounce-duration="300">
        </iron-ajax>
        
        `;
    }
    static get properties() {
        return {
          pagetitle: {
            type: String,
            value: 'Product Analytics'
          }
          
        };
    }
}
customElements.define('product-analytics', ProductAnalytics);
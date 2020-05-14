import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from '../cart.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

product;

info = "";

constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      this.product = products[+params.get('productId')];
      this.draw();
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  /**
   * https://stackblitz.com/edit/angular-canvas-svg-gridfile=src%2Fapp%2Fapp.component.css
   */

    textClicked() {
    console.log("text clicked");
  }

  changeSize(size) {
    let val = size === -1 ? "" : `${size}px`;
    d3.select(".mygrid")
      .style("width", val);
  }

  getSize() {
    
    let s1 = d3.select(".child1").style("width");
    let s2 = d3.select(".child-svg").style("width");
    let s3 = d3.select(".child-canvas").style("width");
    let s4 = d3.select(".child2").style("width");

    this.info = `${s1} ${s2} ${s3} ${s4}`;

    // this.draw();
  }

  draw() {

    console.log('drawing...');

    let selcanvas = d3.select(".child-canvas");
    let canvas = <HTMLCanvasElement>selcanvas.node();

    // get the width/height of css properties set the canvas buffer
    let w = parseInt(selcanvas.style("width"));
    let h = parseInt(selcanvas.style("height"));

    canvas.width = w;
    canvas.height = h;

    let ctx = canvas.getContext("2d");

    // remove all the svg children, get dim to draw
    let selsvg = d3.select(".child-svg");
    selsvg.selectAll("*").remove();

    let sw = parseInt(selsvg.style("width"));
    let sh = parseInt(selsvg.style("height"));
    
    var actualX = 10;
    for (let i = 0; i < 13; i++) {
      selsvg.append("rect")
      .attr("x", `${actualX}`)
      .attr("y", 40)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "black");
      actualX += 20;
    }

    console.log("canvas", w, h, "svg", sw, sh);
  }
}
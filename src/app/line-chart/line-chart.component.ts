import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  title = 'Line Chart';
  oneval: Number=22
  twoval:number=44
  threeval:number=55
  fourval:number=70
  fiveval:number=90
  yes=true
  data: any[] = [
  {date: new Date('2019-01-01'), value: this.oneval},
  {date: new Date('2019-02-01'), value: this.twoval},
  {date: new Date('2019-03-01'), value: this.threeval},
  {date: new Date('2019-04-01'), value: this.fourval},
  {date: new Date('2019-05-01'), value: this.fiveval}
 
  ];

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination

constructor() { 
    // configure margins and width/height of the graph

 this.width = 960 - this.margin.left - this.margin.right;
      this.height = 500 - this.margin.top - this.margin.bottom;}

ngOnInit() {
  this.buildSvg();
  this.addXandYAxis();
  this.drawLineAndPath();
}
onchange(v){
  this.buildSvg();
  this.addXandYAxis();
  this.drawLineAndPath();
}
changegraph(one,two,three,four,five){
  this.yes=false
  console.log(one.value)
  this.data=[
    {date: new Date('2019-01-01'), value: one.value},
    {date: new Date('2019-02-01'), value: two.value},
    {date: new Date('2019-03-01'), value: three.value},
    {date: new Date('2019-04-01'), value:four.value},
    {date: new Date('2019-05-01'), value: five.value}
   
    ];
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
}

private buildSvg() {
      this.svg = d3.select('svg')
          .append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  private addXandYAxis() {
       this.x = d3Scale.scaleTime().range([0, this.width]);
       this.y = d3Scale.scaleLinear().range([this.height, 0]);
       this.x.domain(d3Array.extent(this.data, (d) => d.date ));
       this.y.domain(d3Array.extent(this.data, (d) => d.value ));
      // Configure the Y Axis
      this.svg.append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));
      // Configure the Y Axis
      if (this.yes){
      this.svg.append('g')
          .attr('class', 'axis axis--y')
          .call(d3Axis.axisLeft(this.y));
      }
  }

  private drawLineAndPath() {
      this.line = d3Shape.line()
          .x( (d: any) => this.x(d.date) )
          .y( (d: any) => this.y(d.value) );
      this.svg.append('path')
          .datum(this.data)
          .attr('class', 'line')
          .attr('d', this.line);
  }

  

}

import {SVG_NS} from '../settings';

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    
  }
  
  render(svg,score) {
    var newText = document.createElementNS(SVG_NS,'text');
    newText.setAttributeNS(null,'x',this.x);     
    newText.setAttributeNS(null,'y',this.y); 
    newText.setAttributeNS(null,'font-size',this.size);
    newText.setAttributeNS(null,'font-family','Arial');
    newText.setAttributeNS(null,'fill','#fff');
    newText.innerHTML = score;
    svg.appendChild(newText);
  }
}
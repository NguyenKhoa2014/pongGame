import {SVG_NS} from '../settings';

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    
  }
  
  render(svg,score) {
    //    <text x="320" y="30" fill="white" font-size="40" kerning="10"> 0 </text>
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
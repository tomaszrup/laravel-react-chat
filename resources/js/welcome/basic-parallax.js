class Parallax {
  constructor() {
    document.querySelector('body').addEventListener("mousemove", (event) => this.animate(event));
    this.elements = [];
  }
  animate(event) {
    let y = event.y;
    let x = event.x;

    for(let element of this.elements) {
      let nodes = document.querySelectorAll(element.selector);
      for(let node of nodes) {
        let rect = node.getBoundingClientRect();
        let offsetX = ((x - screen.width / 2) / 80) * element.speed * (element.inverseX ? -1 : 1);
        let offsetY = ((y - screen.height / 2) / 80) * element.speed * (element.inverseY ? -1 : 1);

        node.style.transform = "translate(" + offsetX + "px, " + offsetY + "px)";
      }
    }
  }
  add(selector, options) {
    if(!options.speed) throw "Speed is a required option.";
    if(!selector) throw "Please specify a selector.";
    if(Array.isArray(selector)) {
      for(let s of selector) {
        this.elements.push({ selector: s, ...options });
      }
    }
    else if(typeof selector == 'string' || selector instanceof String) {
      this.elements.push({ selector, ...options });
    }
    else {
      throw "Enter an array of selectors or a single selector"
    }
  }
}

export default new Parallax;

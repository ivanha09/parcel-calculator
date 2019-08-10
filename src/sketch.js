export default function sketch(p) {
  let length = p.length;
  let width = p.width;
  let height = p.height;
  let img;

  p.setup = function() {
    p.createCanvas(p.windowWidth / 2, p.windowHeight / 2.5, p.WEBGL);
    img = p.loadImage("assets/jp.png");
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    props.length ? (length = props.length * 2) : (length = 100);
    props.width ? (width = props.width * 2) : (width = 100);
    props.height ? (height = props.height * 2) : (height = 100);
  };

  p.draw = function() {
    p.background(300);

    p.push();
    p.rotateX(-120);
    p.texture(img);
    p.rotateY(p.frameCount * 0.006);
    p.box(width, height, length);
    p.pop();
  };
}

//box([width], [Height], [depth], [detailX], [detailY])

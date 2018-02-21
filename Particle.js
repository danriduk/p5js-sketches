colorArray = [
	'#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'
];

var maxRadius = 35;
var area = 60;

function Particle() {
	dx = random(-1, 1);
	dy = random(-1, 1);
	r = random(3,10);

	x = random(0+r, width-r);
	y = random(0+r, height-r);

	this.color = random(colorArray)

	this.pos = createVector(x,y);
	this.vel = createVector(dx,dy);
	this.r = r;
	this.oriR = r;

	this.vel.setMag(0.1);

	this.update = function() {
		if (this.pos.x+this.r >= width || this.pos.x-this.r <= 0) {
			this.vel.x = -this.vel.x;
		}
		if (this.pos.y+this.r >= height || this.pos.y-this.r <= 0) {
			this.vel.y = -this.vel.y;
		}

		this.pos.add(this.vel);

		mousePos = createVector(mouseX, mouseY);
		var dist = mousePos.dist(this.pos);

		if (dist < area && this.r < maxRadius) {
			this.r += 2;
		} else if (dist > area && this.oriR <= this.r) {
			this.r -= 1;
		}
	}

	this.show = function() {
		noStroke();
	  fill(this.color);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}

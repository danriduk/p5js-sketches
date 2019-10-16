// Constants
var particlesArray = [];

function setup() {
    let p5canvas = createCanvas(windowWidth, windowHeight);
    canvas = p5canvas.canvas;
    frameRate(30);

    // background
    background(50);

    // create particles
    var amount = (width + height) / 3;
    for (var i = 0; i < amount; i++) {
        particlesArray[i] = new Particle();
    }

}

function draw() {
    background(50);
    for (var i = particlesArray.length - 1; i >= 0; i--) {
        particlesArray[i].show();
        particlesArray[i].update();
    }
    Connect();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// Particles
function Particle() {
    dx = random(-1, 1);
    dy = random(-1, 1);
    r = 5;

    x = random(0 + r, width - r);
    y = random(0 + r, height - r);

    this.color = '#2C3E50';

    this.pos = createVector(x, y);
    this.vel = createVector(dx, dy);
    this.r = r;
    this.oriR = r;

    this.vel.setMag(2);

    this.update = function () {
        if (this.pos.x + this.r >= width || this.pos.x - this.r <= 0) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.r >= height || this.pos.y - this.r <= 0) {
            this.vel.y = -this.vel.y;
        }

        // this.pos.add(this.vel);

        mousePos = createVector(mouseX, mouseY);
        var dist = mousePos.dist(this.pos);
        pushVal = 5;

        // this.vel.x = mousePos.x - this.pos.x;
        // this.vel.y = mousePos.y - this.pos.y;

        if (dist < this.r * 25) {
            if (mousePos.x < this.pos.x && this.pos.x < width - this.r) {
                this.pos.x += pushVal;
            }
            if (mousePos.x > this.pos.x && this.pos.x > this.r * 10) {
                this.pos.x -= pushVal;
            }
            if (mousePos.y < this.pos.y && this.pos.y < height - this.r) {
                this.pos.y += pushVal;
            }
            if (mousePos.y > this.pos.y && this.pos.y > this.r * 10) {
                this.pos.y -= pushVal;
            }
        }

        this.pos.add(this.vel);
    }

    this.show = function () {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

}

// connect particles
function Connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dist = particlesArray[a].pos.dist(particlesArray[b].pos);

            if (dist < (width / 100) * (height / 100)) {
                stroke(1);

                beginShape(LINES);
                // line(particlesArray[a].pos.x, particlesArray[a].pos.y,
                //     particlesArray[b].pos.y, particlesArray[b].pos.y);
                vertex(particlesArray[a].pos.x, particlesArray[a].pos.y);
                vertex(particlesArray[b].pos.x, particlesArray[b].pos.y);
                endShape();
            }
        }
    }
}

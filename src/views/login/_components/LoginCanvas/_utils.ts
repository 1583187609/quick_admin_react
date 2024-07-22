function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

class Point {
  constructor(cvs: any) {
    this.cvs = cvs;
    this.r = 6;
    this.x = getRandom(0, cvs.width - this.r / 2);
    this.y = getRandom(0, cvs.height - this.r / 2);
    this.xSpeed = getRandom(-50, 50);
    this.ySpeed = getRandom(-50, 50);
    this.lastDrawTime = null;
  }
  draw() {
    const { x, y, r, cvs, xSpeed, ySpeed, lastDrawTime } = this;
    const ctx = cvs.getContext("2d");
    if (lastDrawTime) {
      const duration = (Date.now() - lastDrawTime) / 1000;
      const xDis = xSpeed * duration,
        yDis = ySpeed * duration;
      let xx = this.x + xDis,
        yy = this.y + yDis;

      if (xx > cvs.width - this.r / 2) {
        xx = cvs.width - this.r / 2;
        this.xSpeed = -xSpeed;
      } else if (xx < 0) {
        xx = 0;
        this.xSpeed = -xSpeed;
      }

      if (yy > cvs.height - this.r / 2) {
        yy = cvs.height - this.r / 2;
        this.ySpeed = -ySpeed;
      } else if (yy < 0) {
        yy = 0;
        this.ySpeed = -ySpeed;
      }

      this.x = xx;
      this.y = yy;
    }
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
}

class Graph {
  constructor(cvs, num = 50, maxDis = 200) {
    this.cvs = cvs;
    this.maxDis = maxDis;
    this.points = Array(num)
      .fill(0)
      .map(() => new Point(cvs));
  }
  draw() {
    const { cvs, points, maxDis } = this;
    const ctx = cvs.getContext("2d");
    requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    points.forEach((p1: any, i: number) => {
      p1.draw();
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (d > maxDis) continue;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(200,200,200,${1 - d / maxDis})`;
        ctx.stroke();
      }
    });
  }
}

export function initCanvasLineDotBg(selector: string, width = innerWidth, height = innerHeight) {
  const cvs: any = document.querySelector(selector);
  const ctx = cvs.getContext("2d");
  cvs.width = width;
  cvs.height = height;
  const g = new Graph(cvs);
  g.draw();
}

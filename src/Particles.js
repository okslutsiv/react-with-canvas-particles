import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function getDistance(particle1, particle2) {
  return Math.sqrt(
    Math.pow(particle2.x - particle1.x, 2) +
      Math.pow(particle2.y - particle1.y, 2),
  );
}

function Particle(ctx, velocity, radius, colors, width, height, minDistance) {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.radius = radius;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.dx = (Math.random() - 0.5) * velocity;
  this.dy = (Math.random() - 0.5) * velocity;

  this.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  };

  this.update = function(arr) {
    this.x += this.dx;

    if (this.x > width - this.radius || this.x < this.radius) {
      this.dx = -this.dx;
    }
    this.y += this.dy;
    if (this.y > height - this.radius || this.y < this.radius) {
      this.dy = -this.dy;
    }

    this.draw();
  };
}

const Particles = ({
  num,
  width,
  height,
  radius,
  colors,
  velocity,
  minDistance,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const particlesArray = [];
    if (canvas.width > 0 && canvas.height > 0)
      for (let i = 0; i < num; i++) {
        particlesArray.push(
          new Particle(
            ctx,
            velocity,
            radius,
            colors,
            width,
            height,
            minDistance,
          ),
        );
      }
    ctx.fillStyle = "#212121";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.draw();
    });

    function update() {
      for (let i = 0; i < particlesArray.length; i++) {
        const p1 = particlesArray[i];
        for (let j = i + 1; j < particlesArray.length; j++) {
          const p2 = particlesArray[j];
          const dist = getDistance(p2, p1);
          if (dist < minDistance && dist > radius) {
            const opacity = Math.min(minDistance + 10 - Math.floor(dist), 90);
            ctx.save();
            ctx.strokeStyle = `${p1.color}${opacity}`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
        p1.update();
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      update();
    }
    const id = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(id);
    };
  }, [num, width, height, colors, velocity, radius, minDistance]);
  return <canvas ref={canvasRef}></canvas>;
};

Particles.propTypes = {
  num: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  radius: PropTypes.number,
  colors: PropTypes.array,
  velocity: PropTypes.number,
  minDistance: PropTypes.number,
};
Particles.defaultProps = {
  num: 50,
  radius: 2,
  colors: ["#ffffff"],
  velocity: 2,
  minDistance: 70,
};
export default Particles;

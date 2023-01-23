var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var points = [];
      var x1, y1, x2, y2;
      var threshold = 95;

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);

      function startDrawing(event) {
        x1 = event.clientX;
        y1 = event.clientY;
        ctx.moveTo(x1, y1);

        points.push({x: x1, y: y1});
      }

      function draw(event) {
        if (x1 === undefined) {
          return;
        }
        if(event.buttons === 1){
          x2 = event.clientX;
          y2 = event.clientY;
          points.push({x: x2, y: y2});
          ctx.lineTo(x2, y2);
          ctx.stroke();
          straightness = checkLineStraightness();
          if(straightness > threshold){
              ctx.strokeStyle = "green"; // change color to green
          }else{
              ctx.strokeStyle = "black"; // change color back to black
          }
      }
      
      }

      function stopDrawing() {
        checkLineStraightness();
        x1 = undefined;
        points.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
      }

      function checkLineStraightness() {
        var straightLineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var actualLineLength = 0;
        for (var i = 1; i < points.length; i++) {
          actualLineLength += Math.sqrt(Math.pow(points[i].x - points[i-1].x, 2) + Math.pow(points[i].y - points[i-1].y, 2));
        }
        var straightness = (straightLineLength / actualLineLength) * 100;
        console.log("Line straightness: " + straightness + "%");
        return straightness;
      }

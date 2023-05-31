/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useMemo, useRef } from 'react'
import { SnakeController } from './Snake/SnakeController';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useMemo(() => canvasRef.current?.getContext("2d"), [canvasRef]);

  const snakeController = useMemo(() => {
    if (canvasCtx) return new SnakeController(canvasCtx, 240, 240);
    else return null;
  }, [canvasCtx]);

  useEffect(() => {
    if (!snakeController) return;

    const cb = () => {
      if (snakeController.tick()) {
        return;
      }

      canvasCtx?.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      snakeController.render();
      requestAnimationFrame(cb)
    };

    requestAnimationFrame(cb)

    return () => snakeController.dispose();

  }, [canvasCtx, snakeController]);

  return <canvas ref={canvasRef} width={500} height={500} style={{ border: "10px solid red" }} />;
}

export default App

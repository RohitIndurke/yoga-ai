export function calculateAngle(
                              a: { x: number; y: number; }, 
                               b: { x: number; y: number; },
                               c: { x: number; y: number; })
                              {
  const ab = {
    x: a.x - b.x,
    y: a.y - b.y,
  };

  const cb = {
    x: c.x - b.x,
    y: c.y - b.y,
  };

  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
  const magCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y);

  const angleRad = Math.acos(dot / (magAB * magCB));
  const angleDeg = angleRad * (180 / Math.PI);

  return angleDeg;
}

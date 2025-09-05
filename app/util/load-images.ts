export function loadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map((src) => loadImage(src)));
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (e: any) => {
      reject(e);
    };

    img.src = src;
  });
}

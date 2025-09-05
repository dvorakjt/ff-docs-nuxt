export type BackgroundState = "collapsed" | "expanded";

interface SizeAndPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PaintBackgroundParams {
  goalState: BackgroundState;
  animationProgress: number;
  heroSizeAndPosition: SizeAndPosition;
}

// paint background can be called on screen resize after resizing the canvas
// the canvas should always be initially sized once and also painted if
// the route is not '/'
export class BackgroundPainter {
  private context: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private images: HTMLImageElement[],
    private backgroundLogoWidth: number,
    private backgroundLogoHeight: number,
    private backgroundGutterX: number,
    private backgroundGutterY: number
  ) {
    this.context = canvas.getContext("2d")!;
  }

  public paintBackground({
    goalState,
    animationProgress,
    heroSizeAndPosition,
  }: PaintBackgroundParams): void {
    this.prepareCanvas(goalState, animationProgress);

    /*
      Don't draw anything if the background is fully collapsed because an SCG of 
      the Fully Formed icon will be rendered in the center of the screen instead.
    */
    if (goalState === "collapsed" && animationProgress >= 1) {
      return;
    }

    this.drawBackground(goalState, animationProgress, heroSizeAndPosition);
  }

  private prepareCanvas(goalState: BackgroundState, animationProgress: number) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = "high";
    const opacity = this.calculateOpacity(goalState, animationProgress);
    this.context.globalAlpha = opacity;
  }

  private calculateOpacity(
    goalState: BackgroundState,
    animationProgress: number
  ) {
    return goalState === "collapsed"
      ? 0.3 + 0.7 * animationProgress
      : 1 - 0.7 * animationProgress;
  }

  private drawBackground(
    goalState: BackgroundState,
    animationProgress: number,
    heroSizeAndPosition: SizeAndPosition
  ) {
    const { width, height } = this.calculateLogoSize(
      goalState,
      animationProgress,
      heroSizeAndPosition.width,
      heroSizeAndPosition.height
    );

    const logo = this.selectOptimallySizedLogo(width);
    const numColumns = this.calculateBackgroundColumns();

    for (let column = 0; column < numColumns; column++) {
      const numRows = this.calculateBackgroundRows(column);

      for (let row = 0; row < numRows; row++) {
        // skip the very first row and column
        if (row === 0 && column === 0) {
          continue;
        }

        const { x, y } = this.calculateLogoPosition(
          goalState,
          animationProgress,
          heroSizeAndPosition,
          row,
          column
        );

        this.context.drawImage(logo, x, y, width, height);
      }
    }
  }

  private calculateLogoSize(
    goalState: BackgroundState,
    animationProgress: number,
    heroWidth: number,
    heroHeight: number
  ) {
    let width: number, height: number;

    if (goalState === "collapsed") {
      width =
        this.backgroundLogoWidth +
        (heroWidth - this.backgroundLogoWidth) * animationProgress;

      height =
        this.backgroundLogoHeight +
        (heroHeight - this.backgroundLogoHeight) * animationProgress;
    } else {
      width =
        heroWidth - (heroWidth - this.backgroundLogoWidth) * animationProgress;

      height =
        heroHeight -
        (heroHeight - this.backgroundLogoHeight) * animationProgress;
    }

    return {
      width,
      height,
    };
  }

  private selectOptimallySizedLogo(width: number) {
    let logo: HTMLImageElement;

    // find the first larger image
    for (let i = 0; i < this.images.length; i++) {
      logo = this.images[i]!;
      if (logo.width >= width) {
        break;
      }
    }

    return logo!;
  }

  private calculateBackgroundColumns() {
    const numColumns = Math.ceil(
      this.canvas.width / (this.backgroundLogoWidth + this.backgroundGutterX)
    );
    return numColumns;
  }

  private calculateBackgroundRows(column: number) {
    let numRows = Math.ceil(
      this.canvas.height / (this.backgroundLogoHeight + this.backgroundGutterY)
    );
    numRows = column % 2 === 1 ? numRows - 1 : numRows;
    return numRows;
  }

  private calculateLogoPosition(
    goalState: BackgroundState,
    animationProgress: number,
    heroSizeAndPosition: SizeAndPosition,
    row: number,
    column: number
  ) {
    const x = this.calculateAdjustedBackgroundLogoX(
      goalState,
      animationProgress,
      heroSizeAndPosition,
      column
    );

    const y = this.calculateAdjustedBackgroundLogoY(
      goalState,
      animationProgress,
      heroSizeAndPosition,
      row,
      column
    );

    return { x, y };
  }

  private calculateAdjustedBackgroundLogoX(
    goalState: BackgroundState,
    animationProgress: number,
    heroSizeAndPosition: SizeAndPosition,
    column: number
  ) {
    let x: number;
    const backgroundLogoX = this.calculateBackgroundLogoX(column);

    if (goalState === "collapsed") {
      x =
        backgroundLogoX +
        (heroSizeAndPosition.x - backgroundLogoX) * animationProgress;
    } else {
      x =
        heroSizeAndPosition.x -
        (heroSizeAndPosition.x - backgroundLogoX) * animationProgress;
    }

    return x;
  }

  private calculateBackgroundLogoX(column: number) {
    const x = column * (this.backgroundLogoWidth + this.backgroundGutterX);
    return x;
  }

  private calculateAdjustedBackgroundLogoY(
    goalState: BackgroundState,
    animationProgress: number,
    heroSizeAndPosition: SizeAndPosition,
    row: number,
    column: number
  ) {
    let y = this.calculateBackgroundLogoY(row, column);

    if (goalState === "collapsed") {
      y = y + (heroSizeAndPosition.y - y) * animationProgress;
    } else {
      y =
        heroSizeAndPosition.y - (heroSizeAndPosition.y - y) * animationProgress;
    }

    return y;
  }

  private calculateBackgroundLogoY(row: number, column: number) {
    const y =
      row * (this.backgroundLogoHeight + this.backgroundGutterY) +
      (column % 2 === 1
        ? Math.round((this.backgroundLogoHeight + this.backgroundGutterY) / 2)
        : 0);
    return y;
  }
}

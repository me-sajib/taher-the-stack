class ListController<T> {
  public current: T;
  public items: T[];
  public index = -1;

  constructor(items: T[]) {
    this.items = items;
    this.current = this.next();
  }

  public get exceptCurrentItem(): T {
    let pickedIndex: number =
      this.index;

    while (this.index === pickedIndex) {
      pickedIndex = Math.floor(
        Math.random() *
          this.items.length
      );
    }

    return this.items[pickedIndex];
  }

  public next(): T {
    const nextValue: T =
      this.items[++this.index];

    if (this.current) {
      this.current = nextValue;
    }

    if (
      this.index === this.items.length
    ) {
      this.reset();
    }

    return nextValue;
  }

  public reset(): T {
    this.index = 0;
    this.current =
      this.items[this.index];

    return this.current;
  }
}

export default ListController;

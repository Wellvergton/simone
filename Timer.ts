class Timer {
  private timeout: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);
  private subscriptions: Array<Function> = [];

  private notify(): void {
    this.subscriptions.forEach((subscription) => subscription());
  }

  public subscribe(subscription: Function): void {
    this.subscriptions.push(subscription);
  }

  public unsubscribeAll(): void {
    this.subscriptions = [];
  }

  public init(): void {
    this.timeout = setTimeout(() => this.notify(), 5000);
  }

  public clear(): void {
    clearTimeout(this.timeout);
  }
}

export default Timer;

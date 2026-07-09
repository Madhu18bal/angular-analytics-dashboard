async load(): Promise<void> {
  console.log("Load started");

  this.status = "loading";

  try {
    const result = await this.dataService.getDashboardData();

    console.log("Data received", result);

    this.data = result;

    this.status = "success";

    console.log("Status changed to", this.status);

  } catch (e) {
    console.error("Error:", e);
    this.status = "error";
  }
}
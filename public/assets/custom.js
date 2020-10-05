function newApplicationSubmitInterceptor(data) {
  console.log("intercepting data while sumitting the form");
  data.ts = Date.now();
  return new Promise((resolve) => {
    resolve(data);
  });
}

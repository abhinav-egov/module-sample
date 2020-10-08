function newApplicationSubmitInterceptor(data) {
  console.log("intercepting data while sumitting the form");
  data.ts = Date.now();
  return new Promise((resolve) => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        data.userId = json.userId;
        resolve(data);
      });
  });
}

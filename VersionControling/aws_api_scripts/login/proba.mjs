const url =
  "https://pgq6yqmpcf.execute-api.eu-north-1.amazonaws.com/production/login"; // Replace with your API endpoint URL
const data = {
  username: "value1",
  password: "value2",
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Response from API:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Assuming your handler returns a JSON object with a token property
const responseBody = JSON.parse(response.body);
const token = responseBody.token;

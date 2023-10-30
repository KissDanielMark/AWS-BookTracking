import { handler } from "./login.mjs";

describe("Login Authentication", () => {
  it("should return a JWT token for valid credentials", async () => {
    const event = {
      body: JSON.stringify({
        username: "valid_username",
        password: "valid_password",
      }),
    };

    //const response = await handler(event);
    //console.log(response);
   
    // Assert that a token is returned
    expect(token).toBeDefined();
  });

  it("should return an error message for invalid credentials", async () => {
    const event = {
      body: JSON.stringify({
        username: "invalid_username",
        password: "invalid_password",
      }),
    };

    const response = await handler(event);

    // Assuming your handler returns a JSON object with an error message property
    const responseBody = JSON.parse(response.body);
    const errorMessage = responseBody.error;

    // Assert that an error message is returned
    expect(errorMessage).toBeDefined();
  });
});

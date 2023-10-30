"use strict";

export const handler = async (event) => {
  // TODO implement
  let body = JSON.stringify(event);
  let obj = JSON.parse(body);

  const response = {
    statusCode: 200,
    body: obj.username,
  };
  return response;
};

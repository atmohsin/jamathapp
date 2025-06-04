import type { DataProvider } from "@refinedev/core";

const API_URL = "http://localhost:8080/api";

export const jamathDataProvider: DataProvider = {
  getOne: () => {
    throw new Error("Not implemented");
  },
  update: () => {
    throw new Error("Not implemented");
  },
 getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(`${API_URL}/${resource}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
   create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
};
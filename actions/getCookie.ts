"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getData() {
  const response = await fetch("http://localhost:3001/admin/stocks", {
    headers: {
      Authorization: cookies().toString(),
    },
  });
  return await response.json();
}

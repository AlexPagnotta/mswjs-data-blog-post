// src/mocks/db.ts

import { factory, primaryKey } from "@mswjs/data";
import { datatype, internet } from "faker";

// Define user model
export const db = factory({
  user: {
    id: primaryKey(datatype.number),
    email: internet.email,
  },
});

// Seed database with 10 initials users
for (let index = 0; index < 10; index++) {
  db.user.create();
}

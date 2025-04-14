// clerkld, email, username, photo, firstName, lastName, planld, creditBalance,

import { model, models, Schema } from "mongoose";

// export interface IUser {
//   clerkId: string;
//   email: string;
//   username: string;
//   photo: string;
//   firstName: string;
//   lastName: string;
//   planId: string;
//   creditBalance: number;
// }

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  photo: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  planId: { type: String, required: true },
  creditBalance: { type: Number, required: true },
});

const User = models?.User || model("User", UserSchema);

export default User;

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { first_name, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return (
        NextResponse.json({ error: "User already exist" }), { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({ first_name, email, password: hashPassword });
    const saveUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      error: false,
      saveUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

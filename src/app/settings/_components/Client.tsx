"use client";
import { preRegister, unRegister } from "@/lib/user/registration";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { updateInfo } from "@/lib/user/updateInfo";
import { useState } from "react";
import { z } from "zod";
import { editUserSchema } from "@/lib/schemas/user";

type Props = {
  user: Prisma.UserGetPayload<{
    include: {
      mailingList: true;
    };
  }>;
};

export default function Client({ user }: Props) {
  const [edit, setEdit] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="p-4 text-left">
      <h1 className="text-3xl">
        {user ? `Welcome ${user.firstName}!` : "Not logged in."}
      </h1>

      <div>
        <Link href={`/logout`} className="underline">
          Logout
        </Link>
        <br />
        {user.mailingList?.preRegistered ? (
          <div>
            <h1>You are preregistered!</h1>
            <form action={unRegister}>
              <input
                type="submit"
                className="underline"
                value="Click here to unregister."
              />
            </form>
          </div>
        ) : (
          <div>
            <h1> You are not yet preregistered.</h1>
            <form action={preRegister}>
              <input
                type="submit"
                className="underline"
                value="Click here to preregister."
              />
            </form>
          </div>
        )}

        {!edit ? (
          <ul>
            <li> {user ? `First Name: ${user.firstName}` : ""} </li>
            <li> {user ? `Last Name: ${user.lastName}` : ""} </li>
            <li> {user ? `Email: ${user.email}` : ""} </li>
            <form action={() => setEdit(true)}>
              {" "}
              <input type="submit" value="Edit Info" className="underline" />
            </form>
          </ul>
        ) : (
          <div>
            <form
              action={(e) => {
                console.log(formData);
                try {
                  const validatedData = editUserSchema.parse(formData);

                  updateInfo(e);

                  setEdit(false);
                  setFormErrors("");
                } catch (error) {
                  if (error instanceof z.ZodError) {
                    setFormErrors(error.issues[0].message);
                  } else {
                    throw error;
                  }
                }
              }}
            >
              <div>
                <ul>
                  <li>
                    {" "}
                    {user ? `First Name:` : ""}
                    <input
                      required
                      onChange={handleChange}
                      name="firstName"
                      className=" bg-off-black outline-none pl-1"
                      type="text"
                      placeholder={user?.firstName}
                    />
                  </li>

                  <li>
                    {" "}
                    {user ? `Last Name:` : ""}
                    <input
                      required
                      onChange={handleChange}
                      name="lastName"
                      className=" bg-off-black outline-none pl-1"
                      type="text"
                      placeholder={user?.lastName}
                    />{" "}
                  </li>
                  <li> {user ? `Email: ${user.email}` : ""} </li>
                </ul>
                <input type="submit" value="Save" /> <br />
                {<span>{formErrors}</span>}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";
import { preRegister, unRegister } from "@/lib/user/registration";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { UpdateInfo } from "@/lib/user/UpdateInfo";
import { useState } from "react";
type Props = {
  user: Prisma.UserGetPayload<{
    include: {
      MailingList: true;
    }
  }>;
};

export default function Client({user}: Props) {
    const [edit, setEdit] = useState(false);
    return (<main className="p-4 text-left">
        <h1 className="text-3xl">
            {user ? `Welcome ${user.firstName}!` : "Not logged in."}
        </h1>

      <div>
      <Link href={`/logout`} className="underline">
          Logout
      </Link>
                  <br />
                  {user.MailingList?.preRegistered ? (
              <div>
                  <h1>You are preregistered!</h1>
                  <form action={unRegister}>
                      <input type="submit" className="underline" value="Click here to unregister." />
                  </form> 
              </div>
                  ) : (
                      <div>
                          <h1> You are not yet preregistered.</h1>
                          <form action={preRegister}>
                              <input type="submit" className="underline" value="Click here to preregister." />
                          </form>
                      </div>
                  )}
                   {!edit ? (
                  <ul>
                  <li> {user ? `First Name: ${user.firstName}` : ""} </li>
                  <li> {user ? `Last Name: ${user.lastName}` : ""} </li>
                  <li> {user ? `Email: ${user.email}` : ""} </li>
                  <form action={()=> setEdit(true)}> <input type="submit" value="Edit Info" className="underline"/></form>
                  </ul>
                  ):(
                  <div>
                      <form action={(e: FormData) =>
                      {
                        UpdateInfo(e);
                        setEdit(false);
                      }}>
                        <div>
                        <ul>    
                            <li> {user ? `First Name:` : ""}  <input required name="firstName" className=" bg-off-black outline-none"type="text" placeholder={user?.firstName}/> </li>
                            <li> {user ? `Last Name:` : ""}  <input required name="lastName" className=" bg-off-black outline-none"type="text" placeholder={user?.lastName}/> </li>
                            <li> {user ? `Email: ${user.email}` : ""} </li>
                            </ul>
                          <input type="submit" value="Save"/>
                          </div>
                      </form>
                  </div>
          )}
      </div>
  
</main>
)}
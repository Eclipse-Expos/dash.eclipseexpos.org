"use client"
import { User } from '@prisma/client'
import { prisma } from '@/server/db';
import {useState, useEffect, FormEvent} from 'react';
import { InputStatus } from '@/types/types';
import {
  Button,
  Input,
  Spinner,
  Popover
} from "eclipse-components";


export default function Client({users}:{users: User[]}) {

  const refferalUsers = users;
  const amountOfUsers = refferalUsers.length;


  const [status, setStatus] = useState<InputStatus>(InputStatus.DEFAULT);
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "") {
      setStatus(InputStatus.EMPTY_FIELDS);
      return;
    }

    if (amountOfUsers >= 10) {

      setStatus(InputStatus.ERROR);
      return;
    }

    setStatus(InputStatus.LOADING)

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });

    if (response.status === 200) {
      setStatus(InputStatus.DEFAULT);
      window.location.reload();
    } else if (response.status === 409) {
      setStatus(InputStatus.ALREADY_REGISTERED);
    } else {
      setStatus(InputStatus.ERROR);
    }
  }


  return (
    <>

        <h1 className="text-4xl text-center">Referred Users</h1>
        <h2 className="text-2xl text-center">You have {10 - amountOfUsers} invites left</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {refferalUsers.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg text-black font-semibold">{user.firstName && user.lastName ? "Accepted" : "Pending"}</h3>
              <p className="text-black">{user.email}</p>
            </div>
          ))}
        </div>

        {amountOfUsers < 10 && <form
      className="relative flex flex-col items-center justify-center gap-4 p-4"
      onSubmit={onSubmit}
    >
      {/**
       * If the status is not success or loading, then show the input fields
       */}
      {status !== InputStatus.SUCCESS && status !== InputStatus.LOADING && (
        <>

          <Input
            type="email"
            className="w-72 sm:w-[32rem]"
            required={true}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-72 sm:w-[32rem]">Invite</Button>
        </>
      )}

      {/**
       * If the input is loading, then show the loading spinner
       */}
      {status === InputStatus.LOADING && <Spinner className="mt-10" />}

      {/**
       * If an error occurs, then show the error message
       */}
      {/* <Popover
        open={status === InputStatus.ERROR}
        message="An error has occurred. Please try again with a different email."
        onClose={() => setStatus(InputStatus.DEFAULT)}
      /> */}

      {/**
       * If the user is already registered, then show the error message
       */}
      {/* <Notification
        open={status === InputStatus.ALREADY_REGISTERED}
        message="You are already registered! Check your email for more information."
        onClose={() => setStatus(InputStatus.DEFAULT)}
      /> */}

      {/**
       * If the user hasn't filled out all the fields, then show the error message
       */}
      {/* <Notification
        open={status === InputStatus.EMPTY_FIELDS}
        message="Please fill out all fields"
        onClose={() => setStatus(InputStatus.DEFAULT)}
      /> */}


      {/**
       * If the user has successfully registered, then show the success message
       */}
      {status === InputStatus.SUCCESS && (
        <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
          <h1 className="text-4xl font-black tracking-wide text-primary">
            Thanks for registering!
          </h1>
          <p className="mt-1 text-primary">Let&#39;s break some records.</p>
        </div>
      )}
    </form> }

    {amountOfUsers >= 10 && <div className="flex flex-col items-center justify-center gap-2 tracking-wide">
          <h1 className="text-4xl font-black tracking-wide text-primary">
            You have reached the limit!
          </h1>
            <p className="mt-1 text-primary">You have reached the limit of 10 invites</p>
            </div>

      }
    </>);

}
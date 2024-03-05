'use client'

import { api } from "@/lib/axios";
import { Axios, AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";



export default function Register() {
  const username = useSearchParams().get('username') ?? ''
  const [name, setName] = useState('')


  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/users', {
        name,
        username
      })
      console.log('response', data)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        alert(error.response?.data)
      }
    }
  }


  return (
    <main className="flex items-center justify-center h-[100vh]">
      <form onSubmit={handleRegister} className="grid">
        <label htmlFor="">Username</label>
        <input type="text" value={username} className="border mx-2" />
        <label htmlFor="">Nome Completo</label>
        <input
          onChange={({ target }) => setName(target.value)}
          value={name}
          type="text" placeholder="Nome completo" className="border mx-2" />
        <button type="submit" className="flex flex-row justify-center items-center p-3 gap-2 w-96 h-12 bg-gray-600 rounded-md">Submeter</button>
      </form>
    </main>
  );
}

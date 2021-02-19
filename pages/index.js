import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

const Home = () => {
  const [username, setUsername] = useState('')
  const [platform, setPlatfom] = useState('origin')

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePlatform = (e) => {
    setPlatfom(e.target.value)
  }

  const showProfile = () => {
    Router.push(`/${platform}/${username}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>ApeStats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-11/12 md:w-1/3">
        <h1 className="text-6xl font-bold">ApeStats</h1>
        <div className="flex flex-col w-full my-8">
          <select className="border rounded w-full text-gray-700 py-3 px-4 pr-8 mb-2 leading-tight" value={platform} onChange={(e) => onChangePlatform(e)}>
            <option value="origin">Origin</option>
            <option value="psn">PSN</option>
            <option value="xbl">XboxLive</option>
          </select>
          <input className="border rounded w-full text-gray-700 py-2 px-3 mb-4 leading-tight" type="text" value={username} onChange={(e) => onChangeUsername(e)} placeholder="username"></input>
          <button onClick={(_) => showProfile()} className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            Display
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home

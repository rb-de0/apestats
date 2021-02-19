import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile = ({ profile }) => {
  const segments = profile.segments.map((s) => {
    const stats = Object.values(s.stats).map((stat) => {
      return (
        <div key={stat.displayName} className="h-40 bg-gray-100">
          <div className="flex flex-col p-2 h-full">
            <div className="text-2xl font-bold">{stat.displayName}</div>
            <div className="flex flex-col items-center justify-center flex-grow">
              <div className="text-3xl font-bold pb-4">{stat.displayValue}</div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div key={s.metadata.name} className="flex flex-col">
        <div className="text-3xl font-bold mb-4">{s.metadata.name}</div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 mb-16">{stats}</div>
      </div>
    )
  })

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Head>
        <title>
          {profile.platformInfo.platformSlug}/{profile.platformInfo.platformUserHandle}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-11/12 md:w-8/12">
        <h1 className="text-4xl font-bold mt-12">
          {profile.platformInfo.platformSlug}/{profile.platformInfo.platformUserHandle}
        </h1>
        <div className="w-full mt-8">
          <div>{segments}</div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const headers = {
    'TRN-Api-Key': process.env.TRN_API_KEY,
  }
  const platform = context.params.platform
  const user = context.params.user
  const response = await fetch(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${user}`, {
    headers,
  })
  const json = await response.json()
  if (response.status === 200) {
    return {
      props: {
        profile: json.data,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default Profile

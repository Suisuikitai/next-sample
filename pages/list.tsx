import firebase from 'firebase/app'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function list() {
  const [names, setNames] = useState([''])
  async function listUser() {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .where('active', '==', true)
      .get()

    const nameAry = snapshot.docs.map((doc) => {
      const name = doc.data().name
      return name
    })
    setNames(nameAry)
  }

  useEffect(() => {
    if (!process.browser) {
      return
    }
    listUser()
  }, [])

  return (
    <div>
      <Head>
        <title>Sign up</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello World!</h1>
      {names.map((name) => (
        <div key={name}>
          <h3>{name}</h3>
        </div>
      ))}
      {names.map((name) => (
        <Link href={`/users/`}></Link>
      ))}
    </div>
  )
}

import Head from 'next/head'
import { useCallback } from 'react'
import { Canvas } from '~components/app/Canvas'
import { Inputs } from '~components/app/Inputs'
import { ExtLink } from '~components/ExtLink'
import { Button } from '~components/input/Button'
import { Container } from '~components/layout/Container'
import { Footer } from '~components/layout/Footer'
import { PreloadFlags } from '~components/PreloadFlags'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const onLoadClicked = useCallback(() => {
    // TODO
    console.log('onLoadClicked')
  }, [])

  const onSaveClicked = useCallback(() => {
    // TODO
    console.log('onSaveClicked')
  }, [])

  return (
    <>
      <Container>
        <Head>
          <title>Pride Icons</title>
        </Head>
        <PreloadFlags />

        <h1 className='text-4xl my-6 font-title'>Pride Icons! 🏳️‍🌈</h1>

        <Button onClick={onLoadClicked}>📸 Load Avatar</Button>

        <Inputs />
        <Canvas />

        <Button onClick={onSaveClicked}>💾 Download</Button>
      </Container>

      <Footer>
        <p>
          Made with 💝 by{' '}
          <ExtLink href='https://twitter.com/JackBaron__'>
            lolPants#0001
          </ExtLink>
        </p>

        <p>
          Source available on{' '}
          <ExtLink href='https://github.com/lolPants/pride-icons'>
            GitHub
          </ExtLink>
        </p>
      </Footer>
    </>
  )
}

export default Home

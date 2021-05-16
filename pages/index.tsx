import Head from 'next/head'
import { useCallback } from 'react'
import { Canvas } from '~components/app/Canvas'
import { ExtLink } from '~components/ExtLink'
import { Button } from '~components/input/Button'
import { InputGrid } from '~components/input/InputGrid'
import { OptionInput } from '~components/input/OptionInput'
import { RangeInput } from '~components/input/RangeInput'
import { Container } from '~components/layout/Container'
import { Footer } from '~components/layout/Footer'
import { PreloadFlags } from '~components/PreloadFlags'
import { flagNames } from '~lib/flags'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const onLoadClicked = useCallback(() => {
    // TODO
    console.log('onLoadClicked')
  }, [])

  const onPaddingChanged = useCallback((padding: number) => {
    // TODO
    console.log(`onPaddingChanged: ${padding}`)
  }, [])

  const onAngleChanged = useCallback((angle: number) => {
    // TODO
    console.log(`onAngleChanged: ${angle}`)
  }, [])

  const onFlagChanged = useCallback((flag: string) => {
    // TODO
    console.log(`onFlagChanged: ${flag}`)
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

        <InputGrid>
          <RangeInput
            id='padding'
            label='Padding:'
            min={0}
            max={50}
            step={1}
            onChange={onPaddingChanged}
          />

          <RangeInput
            id='angle'
            label='Angle:'
            min={-10}
            max={10}
            step={0.01}
            onChange={onAngleChanged}
          />

          <OptionInput
            id='flags'
            label='Flag:'
            options={flagNames}
            onChange={onFlagChanged}
          />
        </InputGrid>

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

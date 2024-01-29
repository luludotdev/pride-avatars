import { Suspense } from 'react'
import { Advert } from './_components/advert'
import { ClearImage, LoadImage, SaveImage } from './_components/buttons'
import { Canvas } from './_components/canvas'
import { Container, Content } from './_components/container'
import { Controls } from './_components/controls'
import { RenderDebugLayers } from './_components/debug-layers'
import { KonamiButton, OrangeCredits } from './_components/easter-eggs'
import { Footer, NameCard, RepoCard } from './_components/footer'
import { ThemeButton } from './_components/theme-button'
import { ExperimentalWarning, QualityWarning } from './_components/warnings'

const Root = () => (
  <>
    <Advert />
    <Suspense fallback={null}>
      <RenderDebugLayers />
    </Suspense>

    <Container>
      <Content>
        <h1 className='my-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Pride Avatars 🏳️‍🌈
        </h1>

        <ExperimentalWarning />

        <LoadImage />
        <Suspense fallback={null}>
          <ClearImage />
        </Suspense>

        <Controls />
        <KonamiButton />
        <Canvas />

        <QualityWarning />
        <SaveImage />
      </Content>

      <Footer>
        <p className='leading-7'>
          Made with 💝 by{' '}
          <NameCard
            avatar='https://lulu.dev/avatar.png'
            handle='@lulu.dev'
            href='https://twitter.com/lulu__dev'
            website='https://lulu.dev'
          >
            Lulu
          </NameCard>
        </p>

        <p className='leading-7'>
          Source available on{' '}
          <RepoCard href='https://github.com/luludotdev/pride-avatars'>
            GitHub
          </RepoCard>
        </p>

        <OrangeCredits>
          <p className='leading-7'>
            Cursed Annoying Orange flags made by{' '}
            <NameCard
              avatar='https://avatar-serv.vercel.app/api/discord/246478140132687872'
              handle='@bobbievr'
              href='https://twitter.com/vrbobbie'
            >
              Bobbie
            </NameCard>
          </p>
        </OrangeCredits>
      </Footer>
    </Container>

    <div className='absolute bottom-0 left-0 m-4'>
      <ThemeButton />
    </div>
  </>
)

export const metadata = {
  title: 'Pride Avatars',
  description: 'Enhance your social media avatars with a pride flag border',
}

export const viewport = {
  themeColor: '#afa5fd',
}

export default Root

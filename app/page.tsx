import { Container, Content } from './_components/container'
import { Footer, NameCard, RepoCard } from './_components/footer'

const Root = () => (
  <Container>
    <Content>
      <h1 className='my-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Pride Avatars! 🏳️‍🌈
      </h1>
    </Content>

    <Footer>
      <p className='leading-7'>
        Made with 💝 by{' '}
        <NameCard href='https://twitter.com/lulu__dev'>Lulu</NameCard>
      </p>

      <p className='leading-7'>
        Source available on{' '}
        <RepoCard href='https://github.com/luludotdev/pride-avatars'>
          GitHub
        </RepoCard>
      </p>
    </Footer>
  </Container>
)

export const metadata = {
  title: 'Pride Avatars!',
  description: 'Enhance your social media avatars with a pride flag border!',
}

export const viewport = {
  themeColor: '#afa5fd',
}

export default Root

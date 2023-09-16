import { getStats } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/api/listFactory'
import ListCharts from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListCharts'
import { SectionHeader } from '@/components/content'
import { Container, Grid, Section } from '@/components/wrappers'

const ListStats = async () => {
  const stats = await getStats()

  return (
    <Section id={'faucet-list-stats'} ariaLabel={'Faucet List Statistics'}>
      <Container>
        <SectionHeader
          title={'Faucet List'}
          gradTitle={'Statistics'}
          headingSize={'lg'}
          className={'max-w-2xl text-center'}
        />
        <Grid cols={'two'} className={'mt-12'}>
          <ListCharts stats={stats} />
        </Grid>
      </Container>
    </Section>
  )
}
export default ListStats

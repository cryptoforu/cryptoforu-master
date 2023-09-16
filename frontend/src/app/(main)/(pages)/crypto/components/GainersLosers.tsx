import Image from 'next/image'

import { getGainersLosers } from '@/app/api/crypto/cryptoRoutes'
import { Card, List } from '@/components/content'
import { Container, Grid } from '@/components/wrappers'

const GainersLosers = async () => {
  const data = await getGainersLosers()
  return (
    <Container>
      <Grid cols={'two'}>
        {Object.entries(data).map(([key, items]) => (
          <Card key={key}>
            <List
              items={items}
              renderItem={(item) => (
                <li key={item.id} className={'flex items-center gap-4 py-3'}>
                  <div className={'relative h-10 w-10 flex-none rounded-full'}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-auto max-w-full rounded-full object-cover object-center"
                      width={240}
                      height={240}
                    />
                  </div>
                  <div
                    className={
                      'flex-auto text-sm text-gray-900 dark:text-slate-200'
                    }
                  >
                    {item.price_change_percentage_24h_in_currency}
                  </div>
                </li>
              )}
            />
          </Card>
        ))}
      </Grid>
    </Container>
  )
}
export default GainersLosers

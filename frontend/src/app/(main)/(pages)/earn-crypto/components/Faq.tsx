import { getSiteData } from '@/app/api/site_data/siteRoutes'
import { Accordion, SectionHeader } from '@/components/content'
import { Container, Section } from '@/components/wrappers'
import { GetFaqProps } from '@/types/shared-types'

const Faq = async () => {
  const faq = (await getSiteData('faq_questions')) as GetFaqProps
  const data = faq.data_values.map((val) => ({
    label: val.key,
    content: val.value,
  }))
  return (
    <Section
      id={'faq'}
      ariaLabel={'Faq'}
      className={'bg-white dark:bg-gray-950'}
    >
      <Container>
        <SectionHeader
          title={'Frequently asked'}
          gradTitle={'questions'}
          headingSize={'lg'}
          desc={
            'Have a different question and can’t find the answer you’re looking for? Reach out to our support team by sending us an email and we’ll get back to you as soon as we can.'
          }
        />
        <div className={'mt-8'}>
          <Accordion items={data} />
        </div>
      </Container>
    </Section>
  )
}
export default Faq

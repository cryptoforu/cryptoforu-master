import { SocialShare, socialShareDatum } from 'contentlayer/generated'
import fb from '@/images/social/facebook_circled_240px.png'
import tw from '@/images/social/twitter_circled_240px.png'
import reddit from '@/images/social/reddit_240px.png'
import linkedin from '@/images/social/linkedin_circled_240px.png'
import pinterest from '@/images/social/pinterest_240px.png'

export type SocialKeys = 'fb' | 'tw' | 'pinterest' | 'linkedin' | 'reddit'

const images = [
  {
    image: fb,
    key: 'fb',
  },
  {
    image: tw,
    key: 'tw',
  },
  {
    image: reddit,
    key: 'reddit',
  },
  {
    image: linkedin,
    key: 'linkedin',
  },
  {
    image: pinterest,
    key: 'pinterest',
  },
]

function filterImage(social: SocialShare[]) {
  return images.map((image) => {
    let temp = social.find((el) => el.icon === image.key)
    let newObj
    if (temp) {
      newObj = { ...temp, image: image.image }
    }
    return newObj
  })
}

const useSocialShare = (social_keys: SocialKeys[]) => {
  const social: SocialShare[] = []

  for (let val of social_keys) {
    social.push(socialShareDatum[val])
  }
  return filterImage(social)
}
export default useSocialShare

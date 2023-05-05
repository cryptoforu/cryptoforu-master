import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import useTypedPage from '@/Hooks/useTypedPage';
import type { PageMeta } from '@/Types/generated';
import { usePageProps } from '@/Hooks/useTypedPage';
const AppHead = ({ children }: PropsWithChildren) => {
  const { url } = useTypedPage();
  const { meta } = usePageProps<PageMeta>();
  return (
    <Head>
      <title>{meta?.label ? `${meta?.label}` : 'Cryptoforu'}</title>
      <meta
        // eslint-disable-next-line react/no-unknown-property
        head-key="description"
        name="description"
        content={meta?.meta_desc}
      />
      {children}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={meta?.label} />
      <meta property="og:description" content={meta?.meta_desc} />
      <meta
        property="og:image"
        content={meta?.meta_image || '/img/cache/original/og_image.jpg'}
      />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Cryptoforu" />
      <meta name="twitter:title" content={meta?.label} />
      <meta name="twitter:description" content={meta?.meta_desc} />
      <meta
        name="twitter:image"
        content={meta?.meta_image || '/img/cache/original/og_image.jpg'}
      />
      <meta name="twitter:site" content="@CryptoforuEarn" />
      <meta name="twitter:creator" content="@CryptoforuEarn" />
      <meta name="twitter:url" content={url} />
    </Head>
  );
};

export default AppHead;

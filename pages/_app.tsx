import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { Sample } from '@/types';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

interface CustomAppProps extends AppProps {
  globalProps: {
    samples: Sample[];
    draftMode: boolean;
  };
}

function AppContent({
  Component,
  pageProps,
  globalProps,
}: {
  Component: CustomAppProps['Component'];
  pageProps: CustomAppProps['pageProps'];
  globalProps: CustomAppProps['globalProps'];
}) {

  return (
    <>
      <Layout>
        <Component {...pageProps} {...globalProps} />
      </Layout>
    </>
  );
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const { pathname } = useRouter();

  return (
    <>
      {pathname.includes('/studio') ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          <AppContent Component={Component} globalProps={globalProps} pageProps={pageProps} />
        </AppProvider>
      )}
      {/* {draftMode && <SanityVisualEditing />} */}
    </>
  );
}

// App.getInitialProps = async (context: AppContext) => {
//   if (!context.ctx.req) {
//     return {
//       globalProps: {
//         montages: {
//           initial: { data: [] },
//           draftMode: false,
//         },
//         draftMode: false,
//       },
//     };
//   }

//   const draftMode = !!(
//     context.ctx.req.headers.cookie?.includes('__prerender_bypass') ||
//     context.ctx.req.headers.cookie?.includes('__next_preview_data')
//   );

//   const samples = await fetchSamples({ draftMode });

//   return {
//     globalProps: {
//       samples,
//       draftMode: samples.draftMode || draftMode,
//     },
//   };
// };

export default App;

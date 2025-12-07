import Hero from '@/features/shared/hero';

// export const getStaticProps = async (context: { draftMode?: boolean }) => {
//   const samples = await fetchSamples(context);

//   return {
//     props: {
//       samples,
//       draftMode: samples.draftMode,
//     },
//   };
// };

export default function Page() {

  return (
    <>
      <Hero />
    </>
  );
}

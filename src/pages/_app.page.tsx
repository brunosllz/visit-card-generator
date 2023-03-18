import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { DefaultSeo } from 'next-seo'

import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: 'https://visit-card-generator-pi.vercel.app/',
          title: 'Generate your visit card fast and easy',
          siteName: 'Visit Card Generator',
          images: [
            {
              url: 'https://res.cloudinary.com/dhexs29hy/image/upload/v1679169163/open-graph_rlqt5j.png',
              alt: 'Initial page of Visit Card Generator',
              width: 654,
              height: 761,
            },
          ],
        }}
      />
      <Component {...pageProps} />
      <ToastContainer theme="dark" />
    </>
  )
}
